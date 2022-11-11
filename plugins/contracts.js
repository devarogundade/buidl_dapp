import Vue from "vue"
import contract from 'truffle-contract'

import buidlJson from "../build/contracts/Buidl.json"
import courseJson from "../build/contracts/BdlCourse.json"
import tokenJson from "../build/contracts/BdlToken.json"
import stakingJson from "../build/contracts/Staking.json"

const Contracts = {
    initBuidlContract: async function(provider) {
        if (this.getLastNetworkName() != 'bsc') return

        const buidlContract = contract(buidlJson)
        if (!provider) {
            if (typeof ethereum === 'undefined') {
                $nuxt.$emit('request-connect-wallet')
            } else {
                buidlContract.setProvider(ethereum)
            }
        } else {
            buidlContract.setProvider(provider)
        }

        try {
            buidlContract.deployed().then(instance => {
                $nuxt.$emit('buidl-contract', instance)
            })
        } catch (error) {}
    },

    initCourseContract: async function(provider) {
        if (this.getLastNetworkName() != 'bsc') return

        const courseContract = contract(courseJson)
        if (!provider) {
            if (typeof ethereum === 'undefined') {
                $nuxt.$emit('request-connect-wallet')
            } else {
                courseContract.setProvider(ethereum)
            }
        } else {
            courseContract.setProvider(provider)
        }

        try {
            courseContract.deployed().then(instance => {
                console.log(instance);
                $nuxt.$emit('course-contract', instance)
            })
        } catch (error) {
            console.log(error);
        }
    },

    initTokenContract: async function(provider) {
        if (this.getLastNetworkName() != 'bsc') return

        const tokenContract = contract(tokenJson)
        if (!provider) {
            if (typeof ethereum === 'undefined') {
                $nuxt.$emit('request-connect-wallet')
            } else {
                tokenContract.setProvider(ethereum)
            }
        } else {
            tokenContract.setProvider(provider)
        }

        try {
            tokenContract.deployed().then(instance => {
                $nuxt.$emit('token-contract', instance)
            })
        } catch (error) {}
    },

    initStakingContract: async function(provider) {
        if (this.getLastNetworkName() != 'bsc') return

        const stakingContract = contract(stakingJson)
        if (!provider) {
            if (typeof ethereum === 'undefined') {
                $nuxt.$emit('request-connect-wallet')
            } else {
                stakingContract.setProvider(ethereum)
            }
        } else {
            stakingContract.setProvider(provider)
        }

        try {
            stakingContract.deployed().then(instance => {
                $nuxt.$emit('staking-contract', instance)
            })
        } catch (error) {}
    },

    getLastNetworkName: function() {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem('last-network-name') ? localStorage.getItem('last-network-name') : 'bsc'
        }
        return 'bsc'
    },
}

export default ({}, inject) => {
    inject('contracts', Vue.observable({
        initBuidlContract: async function(provider) {
            await Contracts.initBuidlContract(provider)
        },
        initCourseContract: async function(provider) {
            await Contracts.initCourseContract(provider)
        },
        initTokenContract: async function(provider) {
            await Contracts.initTokenContract(provider)
        },
        initStakingContract: async function(provider) {
            await Contracts.initStakingContract(provider)
        }
    }))
}