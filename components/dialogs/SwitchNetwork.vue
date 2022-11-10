<template>
<div :class="`container ${state}`">
    <div class="box">
        <div class="title">
            <p>Switch Network</p>
            <i v-on:click="$nuxt.$emit('release-switch-network')" class="fa-solid fa-xmark"></i>
        </div>

        <div class="agree">
            <p>Gas will be charge from the native token of selected network.</p>
        </div>

        <div class="post scaleable" v-on:click="selectNetwork('bsc')">
            <img src="/images/bnb.png" alt="">
            <p>Binance Testnet</p>
        </div>

        <div class="post scaleable" v-on:click="selectNetwork('polygon')">
            <img src="/images/polygon.png" alt="">
            <p>Polygon Mumbai</p>
        </div>

        <div class="post scaleable">
            <img src="/images/fantom.png" alt="">
            <p>Fantom Testnet <span>Soon</span></p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['state'],
    methods: {
        selectNetwork: function (network) {
            $nuxt.$emit('release-switch-network')
            $nuxt.$emit('switch-network-to', network)
            this.saveLastNetworkName(network)
            this.$polygon.init()
            this.$contracts.initBuidlContract()
        },

        saveLastNetworkName: function (name) {
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem('last-network-name', name)
                this.$auth.switchToNetwork(name)
            }
        },
    }
}
</script>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    background: #0176fb28;
    backdrop-filter: blur(20px);
    height: 100%;
    width: 100%;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.hide {
    top: 100vh !important;
    transform: scale(0.5, 0.5);
}

.box {
    border-radius: 30px;
    max-width: 90%;
    width: 390px;
    background: #23242F;
    border-radius: 24px;
    padding: 30px;
}

.title {
    color: #FFFFFF;
    display: flex;
    column-gap: 10px;
    font-weight: 600;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;
    margin-right: -10px;
    margin-top: -10px;
}

.title i {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.title i:hover {
    color: #FF6370;
}

.agree {
    padding: 16px;
    width: 100%;
    background: #681c1cb9;
    border-radius: 16px;
    margin-top: 24px;
}

.agree p {
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
}

.agree a {
    color: #0177FB;
}

.post {
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 10px;
    width: 100%;
    background: #2C2D3A;
    border-radius: 16px;
    margin-top: 24px;
    cursor: pointer;
    color: #FFFFFF;
}

.post p {
    font-size: 18px;
    font-weight: 600;
}

.post img {
    height: 30px;
}
</style>
