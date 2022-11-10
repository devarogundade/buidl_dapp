<template>
<div class="landing">
    <LandingHeader />
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
            snState: 'hide',
            address: null,
            provider: this.$auth.provider
        }
    },
    async mounted() {
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

        this.$auth.checkAuth(false)
    },
}
</script>
