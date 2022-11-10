<template>
<div class="container">
    <InProgress v-if="fetching" />
    <div class="grid" v-else>
        <div class="profile">
            <div class="cover">
                <img :src="user.photo" id="cover" alt="">
                <i class="fa-solid fa-pen-to-square">
                    <input type="file" accept="image/*" v-on:change="onFileChange($event)">
                </i>
            </div>

            <div class="form">
                <div class="edit">
                    <p class="label">Full Name *</p>
                    <input :class="getInputClassForName()" type="text" v-model="user.name" placeholder="John Doe" maxlength="45">
                    <p v-if="errorName" class="error-text">{{ errorName }}</p>
                </div>

                <div class="edit" v-if="($utils.fromWei(staked) >= 2000)">
                    <p class="label">Creator Mode</p>
                    <div class="switch-con">
                        <p>Switch between creator mode?</p>
                        <label class="switch">
                            <input type="checkbox" v-model="verified">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div class="sign_up" v-if="!creating" v-on:click="createAccount()">Save changes</div>
                <div class="sign_up" v-else>Please wait..</div>
            </div>
        </div>
        <div class="others">
            <div class="skills">
                <div class="title">
                    <h3>Skills</h3>
                    <i class="fa-solid fa-plus"></i>
                </div>
                <div class="list">
                    <div class="item">Skill 1</div>
                    <div class="item">Skill 2</div>
                    <div class="item">Skill 3</div>
                    <div class="item">Skill 4</div>
                    <div class="item">Skill 5</div>
                    <div class="item">Skill 6</div>
                </div>
                <p class="see-more">See all <i class="fa-solid fa-chevron-down"></i></p>
            </div>
            <div class="positions">
                <div class="title">
                    <h3>Experience</h3>
                    <i class="fa-solid fa-plus"></i>
                </div>
                <div class="list">
                    <div class="item">
                        <div>
                            <p>Experience 1</p>
                            <p>Position 1</p>
                        </div>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="item">
                        <div>
                            <p>Experience 2</p>
                            <p>Position 2</p>
                        </div>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
                <p class="see-more">See all <i class="fa-solid fa-chevron-down"></i></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                photo: '/images/placeholder.png',
                verified: false
            },
            verified: false,
            errorName: null,
            errorBio: null,
            file: null,
            creating: false,
            fetching: true,
            buidlContract: null,
            staked: 0,
            _showPromptVerify: false
        }
    },
    watch: {
        verified: function (_verified) {
            if (this.buidlContract == null || this.$auth.accounts.length == 0) return
            if (_verified) {
                try {
                    this.buidlContract.unlockCreator({
                        from: this.$auth.accounts[0]
                    })
                } catch (error) {}
            } else {
                try {
                    this.buidlContract.removeCreator({
                        from: this.$auth.accounts[0]
                    })
                } catch (error) {}
            }
        }
    },
    async created() {
        this.$contracts.initBuidlContract(this.$auth.provider)
        $nuxt.$on('buidl-contract', (contract) => {
            this.buidlContract = contract
        })

        if (this.$auth.accounts.length == 0) {
            this.fetching = false
            return
        }

        this.getUser()
        this.$contracts.initStakingContract(this.$auth.provider)
        $nuxt.$on('staking-contract', (contract) => {
            this.getStakedBalance(contract)
        })
    },
    methods: {
        getStakedBalance: async function (contract) {
            if (this.$auth.accounts.length == 0) return
            const stake = await contract.stakes(this.$auth.accounts[0])
            this.staked = stake.amount
        },
        getUser: async function () {
            if (this.$auth.accounts.length == 0) return
            const user = await this.$firestore.fetch("users", this.$auth.accounts[0].toUpperCase())
            if (user != null) {
                this.user = user
                this.verified = user.verified
            }
            this.fetching = false
        },
        onFileChange: function (event) {
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0]
                const url = URL.createObjectURL(file)
                this.file = file
                document.getElementById('cover').src = url
            }
        },
        createAccount: async function () {
            if (this.creating || this.buidlContract == null || this.$auth.accounts.length == 0) return
            this.creating = false

            if (this.errorName != null) {
                return
            }

            if (this.user.name == '') {
                return
            }

            if (this.file != null) {
                const base64 = await this.$ipfs.toBase64(this.file)
                const url = await this.$ipfs.upload(`users/${this.$auth.accounts[0]}`, base64)

                if (url != null) {
                    this.user.photo = url
                }
            }

            this.creating = true

            try {
                const trx = await this.buidlContract.setAccount(this.user.name, this.user.photo, {
                    from: this.$auth.accounts[0]
                })

                $nuxt.$emit('trx', trx.tx)
                $nuxt.$emit('success', {
                    title: 'Profile Updated',
                    message: 'Your profile has been updated'
                })
            } catch (error) {

            }

            this.creating = false
        },
        getInputClassForName() {
            if (this.user.name == '') {
                this.errorName = null
                return ''
            }
            if (this.user.name.length < 4) {
                this.errorName = 'Name is too short'
                return 'error filled'
            } else {
                this.errorName = null
                return 'filled'
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 100px;
    padding-bottom: 80px;
}

.profile {
    margin-top: 20px;
    width: 500px;
    max-width: 100%;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
}

.cover {
    width: 100%;
    height: 300px;
    position: relative;
}

.cover i {
    position: absolute;
    bottom: -30px;
    left: 30px;
    width: 60px;
    height: 60px;
    background: #3451f3;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 20px;
    overflow: hidden;
}

.cover input {
    position: absolute;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    width: 100%;
}

.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form {
    margin-top: 100px;
}

.form .edit {
    width: 100%;
    margin-top: 40px;
}

.form .label {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #b8c0e6;
    margin-bottom: 10px;
}

.form input,
select {
    height: 50px;
    border: 2px solid #b8c0e6;
    border-radius: 8px;
    background: transparent;
    width: 100%;
    padding: 0 20px;
    margin-top: 10px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    outline: none;
    color: #F9F6ED;
}

option {
    color: #3D392A;
}

.form .filled {
    border: 2px solid #007a00;
}

.form .error {
    border: 2px solid #C74F4F;
}

.form .error-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #C74F4F;
    margin-top: 10px;
}

.sign_up {
    height: 60px;
    background: linear-gradient(90deg, #4b87f6 -43.68%, #3451f3 72.76%);
    border-radius: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    margin-top: 60px;
    font-weight: 500;
    font-size: 20px;
    color: #FFFFFF;
}

.switch-con {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}

.switch-con p {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

.switch :checked+.slider {
    background-color: #4b87f6;
}

.switch :focus+.slider {
    box-shadow: 0 0 1px #3451f3;
}

.switch :checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.others {
    position: sticky;
    top: 100px;
    height: fit-content;
}

.skills {
    width: 300px;
    border-radius: 10px;
    background: #23242F;
    overflow: hidden;
}

.skills .title,
.positions .title {
    padding: 20px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Poppins', sans-serif;
    width: 100%;
}

.skills .item {
    height: 55px;
    padding: 15px 20px;
    color: #b8c0e6;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px #3B3C4E solid;
}

.skills .item:first-child {
    border-top: 1px #3B3C4E solid;
}

.skills .see-more,
.positions .see-more {
    padding: 20px;
    text-align: center;
    color: #3451f3;
    font-size: 16px;
    font-weight: 600;
}

.positions {
    margin-top: 40px;
    width: 300px;
    border-radius: 10px;
    background: #23242F;
    overflow: hidden;
}

.positions .item {
    height: 65px;
    padding: 15px 20px;
    color: #b8c0e6;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    border-bottom: 1px #3B3C4E solid;
}

.positions .item:first-child {
    border-top: 1px #3B3C4E solid;
}

.positions>div p:last-child {
    font-size: 14px;
    color: #616eb9;
    font-weight: 600;
}
</style>
