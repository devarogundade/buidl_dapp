<template>
<div class="app">
    <div class="bg"><img src="/images/Ellipse1.ee547e.png" alt=""></div>
    <div class="bg2"><img src="/images/ellipse-topleft.svg" alt=""></div>
    <DappHeader />
    <section>
        <div class="app-width">
            <div class="grid">
                <div class="nav">
                    <CollectiblesNav />
                </div>
                <Nuxt class="content" />
            </div>
        </div>
    </section>
    <DappFooter />
    <WalletConnect :state="wcState" />
    <Error />
    <Success />
    <Failure />
</div>
</template>

<script>
export default {
    data() {
        return {
            wcState: 'hide'
        }
    },
    async mounted() {
        $nuxt.$on('request-connect-wallet', () => {
            this.wcState = 'show'
        })
        $nuxt.$on('release-connect-wallet', () => {
            this.wcState = 'hide'
        })

        this.$auth.checkAuth()
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 300px auto;
    gap: 50px;
}

.nav {
    height: 100vh;
    position: sticky;
    top: 0;
}

.bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 600px;
    opacity: 0.3;
    z-index: -1;
}

.bg img {
    width: 100%;
}

.bg2 {
    position: fixed;
    right: -100px;
    bottom: -200px;
    width: 600px;
    opacity: 0.3;
    rotate: 90deg;
    z-index: -1;
}

.bg2 img {
    width: 100%;
}

.content {
    width: 100%;
}

@media screen and (max-width: 1400px) {
    .grid {
        display: grid;
        grid-template-columns: 200px auto;
        gap: 40px;
    }
}

@media screen and (max-width: 1400px) {
    .grid {
        display: grid;
        grid-template-columns: 200px auto;
        gap: 40px;
    }
}

@media screen and (max-width: 800px) {
    .nav {
        z-index: 20;
    }

    .grid {
        display: flex;
        gap: 0;
    }
}
</style>
