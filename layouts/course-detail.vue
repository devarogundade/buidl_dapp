<template>
<div class="explore">
    <div class="bg"><img src="/images/ellipse-topleft.svg" alt=""></div>
    <div class="bg2"><img src="/images/ellipse-bottomright.svg" alt=""></div>
    <ExploreHeader />
    <Nuxt />
    <LandingFooter />
    <WalletConnect :state="wcState" />
    <SwitchNetwork :state="snState" />
    <Error />
    <Success />
    <Failure />
</div>
</template>

<script>
export default {
    data() {
        return {
            wcState: 'hide',
            snState: 'hide'
        }
    },
    async created() {
        $nuxt.$on('request-connect-wallet', () => {
            this.wcState = 'show'
        })
        $nuxt.$on('release-connect-wallet', () => {
            this.wcState = 'hide'
        })

        $nuxt.$on('switch-network', () => {
            this.snState = 'show'
        })
        $nuxt.$on('release-switch-network', () => {
            this.snState = 'hide'
        })

        this.$auth.checkAuth()
    }
}
</script>

<style>
.bg {
    position: fixed;
    left: -150px;
    top: -150px;
    width: 600px;
    opacity: 0.2;
    z-index: -1;
}

.bg img {
    width: 100%;
}

.bg2 {
    position: fixed;
    right: -100px;
    bottom: 0;
    width: 600px;
    opacity: 0.5;
    rotate: 90deg;
    z-index: -1;
}

.bg2 img {
    width: 100%;
}
</style>
