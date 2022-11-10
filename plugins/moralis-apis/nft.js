import Vue from "vue"

export default ({ $axios }, inject) => {
    inject('nft', Vue.observable({
        getUserNfts: async function(address) {
            const options = {
                method: 'GET',
                url: `/${address}/nft`,
                params: { chain: 'bsc testnet', format: 'decimal' },
                headers: {
                    'accept': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                }
            }

            try {
                const response = await $axios.request(options)
                return response.data.result.filter(nft => nft.token_address.toUpperCase() == process.env.NFT_CONTRACT_ADDRESS.toUpperCase())
            } catch (error) {
                return null
            }
        },

        getCertificates: async function(address) {
            const options = {
                method: 'GET',
                url: `/${address}/nft`,
                params: { chain: 'bsc testnet', format: 'decimal' },
                headers: {
                    'accept': 'application/json',
                    'X-API-Key': `${process.env.MORALIS_KEY}`
                }
            }

            try {
                const response = await $axios.request(options)
                return response.data.result.filter(nft => nft.token_address.toUpperCase() == process.env.CERTIFICATE_CONTRACT_ADDRESS.toUpperCase())
            } catch (error) {
                return null
            }
        }
    }))
}
