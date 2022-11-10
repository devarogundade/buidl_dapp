import Vue from "vue";

export default ({ $axios }, inject) => {
    inject('ipfs', Vue.observable({
        upload: async function(path, file) {
            try {
                const options = {
                    method: 'POST',
                    url: '/ipfs/uploadFolder',
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json',
                        'X-API-Key': `${process.env.MORALIS_KEY}`
                    },
                    data: [{ path: path, content: file }]
                }

                const response = await $axios.request(options)
                return response.data[0].path
            } catch (error) {
                return null
            }
        },
        uploadMultiple: async function(array) {
            try {
                const options = {
                    method: 'POST',
                    url: '/ipfs/uploadFolder',
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json',
                        'X-API-Key': `${process.env.MORALIS_KEY}`
                    },
                    data: array
                }

                const response = await $axios.request(options)
                return response.data
            } catch (error) {
                return null
            }
        },
        toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
            })
        }
    }))
}
