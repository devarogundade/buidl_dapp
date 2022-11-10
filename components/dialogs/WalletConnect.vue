<template>
<div :class="`container ${state}`">
    <div class="box">
        <div class="title">
            <p>Connect Wallet</p>
            <i v-on:click="$auth.quitWalletConnection()" class="fa-solid fa-xmark"></i>
        </div>

        <!-- <div class="agree">
            <div class="tick"><input type="checkbox" name="" id=""></div>
            <p>I have read, understand, and agree to the <a href="">Terms of Service.</a></p>
        </div> -->

        <div class="wallet" v-on:click="$auth.connectWallet('metamask')">
            <img src="/images/meta-mask.png" alt="">
            <p>MetaMask</p>
        </div>

        <div class="wallet" v-on:click="$auth.connectWallet('walletconnect')">
            <img src="/images/walletconnect.png" alt="">
            <p>Walletconnect</p>
        </div>

        <div class="wallet" v-on:click="$auth.connectWallet('coinbase')">
            <img src="/images/coinbase.jpg" alt="">
            <p>Coinbase</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['state'],
    mounted() {
        $nuxt.$on('connected', (data) => {
            // $nuxt.$emit('success', data.message)
            $nuxt.$emit('connected-to-wallet', data.wallet)
            $nuxt.$emit('connected-to-account', data.account)
            $nuxt.$emit('release-connect-wallet')
        })
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
    display: grid;
    grid-template-columns: 24px auto;
    padding: 16px;
    gap: 8px;
    width: 100%;
    background: #2C2D3A;
    border-radius: 16px;
    margin-top: 24px;
}

.agree .tick {
    background: #0177FB;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.agree p {
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
}

.agree a {
    color: #0177FB;
}

.wallet {
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    padding: 16px;
    gap: 10px;
    width: 100%;
    background: #2C2D3A;
    border-radius: 16px;
    margin-top: 24px;
    cursor: pointer;
}

.wallet:hover {
    transform: scale(1.05, 1.05);
}

.wallet img {
    width: 40px;
}

.wallet p {
    color: #FFFFFF;
    font-size: 16px;
    line-height: 22px;
}
</style>
