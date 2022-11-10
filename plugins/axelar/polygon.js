import Vue from "vue"
import contract from 'truffle-contract'

import polygonJson from "../../build/contracts/MessageSender.json"

const Contracts = {
    init: async function(provider) {
        if (this.getLastNetworkName() == 'bsc') return

        const polygonContract = contract(polygonJson)
        if (!provider) {
            if (typeof ethereum === 'undefined') {
                $nuxt.$emit('request-connect-wallet')
            } else {
                polygonContract.setProvider(ethereum)
            }
        } else {
            polygonContract.setProvider(provider)
        }

        try {
            polygonContract.deployed().then(instance => {
                $nuxt.$emit('polygon-contract', instance)
            })
        } catch (error) {
            console.log(error);
        }
    },

    getLastNetworkName: function() {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem('last-network-name') ? localStorage.getItem('last-network-name') : 'bsc'
        }
        return 'bsc'
    },
}

export default ({}, inject) => {
    inject('polygon', Vue.observable({
        init: async function(provider) {
            await Contracts.init(provider)
        }
    }))
}