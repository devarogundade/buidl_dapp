import Vue from "vue"
import {
    AxelarGMPRecoveryAPI,
    Environment,
    AxelarQueryAPI,
    EvmChain,
    GasToken
} from "@axelar-network/axelarjs-sdk";

const sdk = new AxelarGMPRecoveryAPI({
    environment: Environment.TESTNET,
});

const sdk2 = new AxelarQueryAPI({
    environment: Environment.TESTNET,
});

export default ({}, inject) => {
    inject('axelarscan', Vue.observable({
        scan: async function(txHash) {
            const txStatus = await sdk.queryTransactionStatus(txHash);
            return txStatus
        },

        getEstimate: async function() {
            const gasFee = await sdk2.estimateGasFee(
                EvmChain.POLYGON,
                EvmChain.BINANCE,
                GasToken.MATIC
            );

            return gasFee
        }
    }))
}