import Vue from "vue";

export default ({ $axios }, inject) => {
    inject('token', Vue.observable({
        getNativeBalance: async function(address) {
            const options = {
                method: 'GET',
                url: `/${address}/balance`,
                params: { chain: 'bsc testnet' },
                headers: {
                    'accept': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                }
            }

            try {
                const response = await $axios.request(options)
                return response.data
            } catch (error) {
                return null
            }
        },
        getTokenBalances: async function(address) {
            const options = {
                method: 'GET',
                url: `/${address}/erc20`,
                params: { chain: 'bsc testnet' },
                headers: {
                    'accept': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                }
            }

            try {
                const response = await $axios.request(options)
                return response.data
            } catch (error) {
                return null
            }
        }
    }))
}