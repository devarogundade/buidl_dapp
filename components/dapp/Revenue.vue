<template>
<div class="container">
    <div class="revenue">
        <div class="title">
            <h3>My Revenue</h3>
            <div class="claim_all"><i class="fa-solid fa-rotate-right"></i> Refresh</div>
        </div>
        <div class="grid">
            <div class="swap">
                <div class="from">
                    <div class="label">
                        <p>Unclaimed</p>
                        <p>Available: {{ Number(revenue.unclaimed) }}</p>
                    </div>
                    <div class="input">
                        <div class="token">
                            <div class="name">
                                <img src="/favicon.ico" alt="">
                                <p>BDL</p>
                            </div>
                        </div>
                        <input type="number" disabled :value="Number(revenue.unclaimed)">
                    </div>
                </div>

                <div class="swap-down">
                    <i class="fa-regular fa-circle-down scaleable"></i>
                </div>

                <div class="from">
                    <div class="label">
                        <p>Claimable</p>
                        <p>Available: {{ Number(revenue.claimable) }}</p>
                    </div>
                    <div class="input">
                        <div class="token">
                            <div class="name">
                                <img src="/favicon.ico" alt="">
                                <p>BDL</p>
                            </div>
                        </div>
                        <input type="number" v-model="claim" placeholder="0">
                    </div>
                </div>

                <div class="rate">
                    <p v-on:click="useMax()">Enter Max</p>
                </div>

                <div class="confirm">Claim</div>
                <p class="confirm_desc">Enter an amount to see more trading details</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            claim: '',
            revenue: {
                claimable: 0,
                claimed: 0,
                unclaimed: 0
            }
        }
    },
    created() {
        this.$contracts.initBuidlContract(this.$auth.provider)
        $nuxt.$once('buidl-contract', (contract) => {
            this.getRevenue(contract)
        })
    },
    methods: {
        useMax: function () {
            this.claim = this.revenue.claimable
        },
        getRevenue: async function (contract) {
            if (this.$auth.accounts.length == 0) return
            const revenue = await contract.revenues(this.$auth.accounts[0])
            this.revenue = {
                claimable: this.$utils.fromWei(revenue.claimable),
                claimed: this.$utils.fromWei(revenue.claimed),
                unclaimed: this.$utils.fromWei(revenue.unclaimed)
            }
        }
    }
}
</script>

<style scoped>
.container {
    padding-top: 140px;
    padding-bottom: 50px;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    margin-top: 100px;
    width: 100%;
    justify-content: center;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title h3 {
    font-size: 40px;
    color: #FFFFFF;
}

.claim_all {
    font-size: 18px;
    height: 50px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    gap: 10px;
    color: #FFFFFF;
    border-radius: 10px;
    background: rgb(34, 145, 0);
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

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
    justify-content: flex-end;
    align-items: center;
    font-size: 16px;
    margin-top: 10px;
    padding: 0 4px;
}

.rate p {
    color: #ffffff;
    line-height: 14px;
    font-size: 14px;
    padding: 6px 12px;
    background: #4F5069;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
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
</style>
