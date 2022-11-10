<template>
<section>
    <div>
        <h3>Category</h3>
        <button v-on:click="mintCategories()">Mint Categories</button>
        <button v-on:click="testAxelar()">Test Axelar</button>
    </div>
</section>
</template>

<style scoped>
section {
    padding: 200px 50px;
    min-height: 100vh;
    color: white;
}

div {
    margin-bottom: 50px;
}
</style>

<script>
import Web3 from 'web3'
export default {
    layout: 'landing',
    data() {
        return {
            courseContract: null,
            polygonContract: null
        }
    },
    created() {
        this.$contracts.initCourseContract(this.$auth.provider)
        this.$contracts.initPolygonContract(this.$auth.provider)

        $nuxt.$on('course-contract', (contract) => {
            this.courseContract = contract
        })
        $nuxt.$on('polygon-contract', (contract) => {
            this.polygonContract = contract
        })
    },
    methods: {
        mintCategories: async function () {
            if (this.courseContract == null) return

            await this.courseContract.mintCategories({
                from: this.$auth.accounts[0]
            })
        },
        testAxelar: async function () {
            if (this.polygonContract == null) return

            const trx = await this.polygonContract.subscribe(177116663397, 0, {
                from: this.$auth.accounts[0]
            })

            console.log(trx);
        },
    }
}
</script>
