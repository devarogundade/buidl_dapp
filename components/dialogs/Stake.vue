<template>
<div class="container">
    <div class="stake">
        <div class="from">
            <div class="label">
                <p>Pay</p>
                <p>Available: {{ from.balance }}</p>
            </div>
            <div class="input">
                <div class="token">
                    <div class="name">
                        <img :src="from.image" alt="">
                        <p>{{ from.symbol }}</p>
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <input type="number" placeholder="0">
            </div>
        </div>

        <div class="stake-down">
            <i class="fa-regular fa-circle-down scaleable" v-on:click="interChange()"></i>
        </div>

        <div class="from">
            <div class="label">
                <p>Receive (Estimated)</p>
                <p>Available: {{ to.balance }}</p>
            </div>
            <div class="input">
                <div class="token">
                    <div class="name">
                        <img :src="to.image" alt="">
                        <p>{{ to.symbol }}</p>
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <input type="number" placeholder="0">
            </div>
        </div>

        <div class="rate">
            <p>1 BDL = 0.005 BNB</p>
            <i class="fa-solid fa-rotate-right scaleable"></i>
        </div>

        <div class="confirm">Stake</div>
        <p class="confirm_desc">Enter an amount to see more trading details</p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            to: {
                contractAddress: '',
                symbol: 'BDL',
                logo: '',
                rateToUsd: 0.01,
                balance: 450.43,
                image: '/images/nft1.jpg'
            },
            from: {
                contractAddress: '',
                symbol: 'BNB',
                logo: '',
                rateToUsd: 328,
                balance: 0.021,
                image: '/images/bnb.png'
            }
        }
    },
    methods: {
        interChange() {
            let temp = this.from
            this.from = this.to
            this.to = temp
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

.stake {
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

.stake-down {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    font-size: 30px;
    color: #FFFFFF;
}

.stake-down i {
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
</style>
