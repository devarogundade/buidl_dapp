<template>
<div class="container">
    <div class="swap">
        <div class="from">
            <div class="label">
                <p>Balance</p>
                <p>Available: {{ $utils.fromWei(from.balance) }}</p>
            </div>
            <div class="input">
                <div class="token">
                    <div class="name">
                        <img :src="from.image" alt="">
                        <p>{{ from.symbol }}</p>
                    </div>
                </div>
                <input type="number" placeholder="0">
            </div>
        </div>

        <div class="swap-down">
            <i class="fa-regular fa-circle-down"></i>
        </div>

        <div class="from">
            <div class="label">
                <p>Stake Amount</p>
                <p v-on:click="useMax()">Use Max</p>
            </div>
            <div class="input">
                <div class="token">
                    <div class="name">
                        <img :src="to.image" alt="">
                        <p>{{ to.symbol }}</p>
                    </div>
                </div>
                <input type="number" v-model="to.balance" placeholder="0">
            </div>
        </div>

        <div class="rate">
            <p>1 BDL = 1 sBDL</p>
        </div>

        <div class="confirm enabled" v-if="to.balance != '' && to.balance > 0" v-on:click="stake()">{{ staking ? 'Staking..' : 'Stake' }}</div>
        <div class="confirm" v-else>Stake</div>
        <p class="confirm_desc">Enter an amount to stake and click "Stake"</p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            to: {
                contractAddress: '',
                symbol: 'sBDL',
                balance: "0",
                image: '/favicon.ico'
            },
            from: {
                contractAddress: '',
                symbol: 'BDL',
                balance: "0",
                image: '/favicon.ico'
            },
            token: null,
            staking: false,
            buidlContract: null
        }
    },
    created() {
        this.getTokenBalances()

        this.$contracts.initBuidlContract(this.$auth.provider)
        $nuxt.$on('buidl-contract', (contract) => {
            this.buidlContract = contract
        })
    },
    methods: {
        getTokenBalances: async function () {
            if (this.$auth.accounts.length == 0) return
            const response = await this.$token.getTokenBalances(this.$auth.accounts[0])
            const token = response.filter(_token => _token.token_address.toLowerCase() == process.env.TOKEN_CONTRACT_ADDRESS.toLowerCase())
            if (token.length > 0) {
                this.token = token[0]
                this.from.balance = this.token.balance
            }
        },
        useMax: function () {
            this.to.balance = this.from.balance
        },
        stake: async function () {
            if (this.buidlContract == null) return

            this.staking = true

            try {
                const trx = await this.buidlContract.stake(
                    this.$utils.toWei(this.to.balance), {
                        from: this.$auth.accounts[0]
                    }
                )
            } catch (error) {}
            this.staking = false
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 160px 0;
}

.swap {
    width: 450px;
    border-radius: 30px;
    background: #2C2D3A;
    padding: 30px;
}

.label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    color: #8B8CA7;
}

.label p:first-child {
    font-size: 16px;
    font-weight: 600;
}

.label p:last-child {
    color: #b3b4cc;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
}

.input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    border: 1px #4F5069 solid;
    margin-top: 10px;
    padding: 0 20px;
    border-radius: 16px;
}

.input .token {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    color: #FFFFFF;
}

.input .name {
    display: flex;
    align-items: center;
    font-family: 'regular';
    font-weight: 600;
}

.input .name img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
}

.input input {
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    text-align: right;
    font-size: 20px;
    color: #FFFFFF;
    width: 200px;
    max-width: 100%;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.swap-down {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    font-size: 30px;
    color: #FFFFFF;
}

.swap-down i {
    cursor: pointer;
}

.rate {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    font-size: 16px;
}

.rate p {
    margin-right: 20px;
    color: #8B8CA7;
    line-height: 16px;
}

.rate i {
    font-size: 18px;
    cursor: pointer;
    color: #FFFFFF;
    cursor: pointer;
}

.confirm {
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    border-radius: 20px;
    background: #3B3C4E;
    color: #4F5069;
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
}

.confirm_desc {
    text-align: center;
    font-size: 16px;
    color: #8B8CA7;
    margin-top: 10px;
}

.enabled {
    background: #0177fb;
    cursor: pointer;
    color: #FFFFFF;
}
</style>
