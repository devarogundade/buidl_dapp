<template>
<section>
    <div class="app-width">
        <div class="mint">
            <div class="input">
                <input type="text" v-model="address" placeholder="Enter address">
                <div class="button" v-if="!minting" v-on:click="mint()">Give me 5000 BDL</div>
                <div class="button" v-else>Minting..</div>
            </div>
            <p class="warning"><i class="fa-solid fa-circle-info"></i> You can't mint more than 5000 BDL tokens.</p>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            address: this.$auth.accounts ? this.$auth.accounts[0] : '',
            minting: false,
            tokenContract: this.$contracts.tokenContract,
            provider: this.$auth.provider,
        }
    },
    mounted() {
        this.$contracts.initTokenContract(this.provider)
        $nuxt.$on('token-contract', (contract) => {
            this.tokenContract = contract
        })
    },
    methods: {
        mint: async function () {
            if (this.tokenContract == null) return

            this.minting = true
            try {
                const trx = await this.tokenContract.faucetMint({
                    from: this.$auth.accounts[0]
                })
            } catch (error) {

            }

            this.minting = false
        }
    }
}
</script>

<style scoped>
.mint {
    min-height: 90vh;
    padding: 160px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.warning {
    margin-top: 20px;
    font-size: 18px;
    color: #FF6370;
    text-align: center;
}

.input {
    width: 500px;
    max-width: 100%;
    border-radius: 20px;
    background: #2C2D3A;
    overflow: hidden;
}

input {
    padding: 0 20px;
    height: 60px;
    width: 100%;
    border: none;
    outline: none;
    color: #FFFFFF;
    background: transparent;
    font-size: 16px;
}

.button {
    height: 60px;
    background: linear-gradient(90deg, #4b87f6 -43.68%, #3451f3 72.76%);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    font-weight: 500;
    font-size: 20px;
    color: #FFFFFF;
}
</style>
