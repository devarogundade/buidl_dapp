<template>
<div class="nav">
    <div class="items">
        <router-link to="/collectibles">
            <div :class="$route.name == 'collectibles' ? 'item active' : 'item'">
                <i class="fa-solid fa-wallet"></i>
                <p>Wallet</p>
            </div>
        </router-link>
        <router-link to="/collectibles/stake">
            <div :class="$route.name == 'collectibles-stake' ? 'item active' : 'item'">
                <i class="fa-solid fa-vault"></i>
                <p>Stake</p>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            tab: 1,
        }
    },
    created() {
        $nuxt.$on('dapp-tab', (tab) => {
            this.tab = tab
        })
    }
}
</script>

<style scoped>
.nav {
    border-right: 1px rgb(201, 227, 255) solid;
    height: calc(100vh - 100px);
    margin-top: 100px;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 50px 0;
}

.item {
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    color: #FFFFFF;
    height: 60px;
    cursor: pointer;
    user-select: none;
}

.active {
    background: rgb(201, 227, 255);
    color: #0177fb;
}

@media screen and (max-width: 800px) {
    .nav {
        position: fixed;
        top: 0;
        left: -400px;
        backdrop-filter: blur(20px);
    }

    .active {
        border-radius: 0;
    }
}
</style>
