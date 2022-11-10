<template>
<section>
    <div class="app-width">
        <div class="header">
            <router-link to="/">
                <div class="logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>
            </router-link>

            <div class="nav" ref="menu">
                <div class="tabs">
                    <router-link to="/explore">
                        <p :class="($route.name == 'explore' || $route.name == 'explore-courses-course') ? 'active tab' : 'tab'">Courses</p>
                    </router-link>
                    <router-link to="/explore/categories">
                        <p :class="$route.name == 'explore-categories' ? 'active tab' : 'tab'">Categories</p>
                    </router-link>
                </div>
            </div>

            <div class="action">
                <div class="app networks" v-if="address != null" v-on:click="$nuxt.$emit('switch-network')">
                    <img :src="networkImage" alt="">
                    <i class="fa-solid fa-chevron-down"></i>
                </div>

                <router-link to="/app">
                    <div class="app enter" v-if="address != null">
                        Enter App
                    </div>
                </router-link>

                <div class="app connect" v-if="address == null" v-on:click="$auth.requestWalletConnection()">
                    Connect Wallet
                </div>
                <div class="app connected" v-else v-on:click="toggleProfile()">
                    <i class="fa-solid fa-wallet"></i>
                    {{
                      address.substring(0, 4) +
                      "..." +
                      address.substring(address.length - 4, address.length)
                    }}
                </div>

                <div ref="handburger" id="handburger" v-on:click="onDrawer()">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="profile" v-if="showProfile">
                <router-link to="/app/profile">
                    <div class="item">My Profile <i class="fa-solid fa-user-tie"></i></div>
                </router-link>
                <router-link to="/app/jobs">
                    <div class="item">Jobs <i class="fa-solid fa-briefcase"></i></div>
                </router-link>
                <router-link to="/app/projects">
                    <div class="item">Projects <i class="fa-solid fa-hammer"></i></div>
                </router-link>
                <a v-on:click="$nuxt.$emit('create-new-post')">
                    <div class="item">Create new post <i class="fa-solid fa-plus"></i></div>
                </a>
                <router-link to="/app/notifications">
                    <div class="item">Notifications <i class="fa-solid fa-bell"></i></div>
                </router-link>
                <router-link to="/app/settings">
                    <div class="item">
                        Account settings <i class="fa-solid fa-gear"></i>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            showProfile: false,
            address: null,
            tab: 1,
            networkImage: '/images/bnb.png'
        };
    },
    mounted() {
        $nuxt.$on("connected-to-account", (address) => {
            this.address = address;
        });
        $nuxt.$on("disconnected", () => {
            this.address = null;
        });
        $nuxt.$on("switch-network-to", (network) => {
            switch (network) {
                case 'polygon':
                    this.networkImage = '/images/polygon.png'
                    break
                case 'fantom':
                    this.networkImage = '/images/fantom.png'
                    break
                default:
                    this.networkImage = '/images/bnb.png'
                    break
            }
        });
    },
    methods: {
        toggleProfile() {
            this.showBuild = false;
            this.showProfile = !this.showProfile;
        },
        onDrawer() {
            this.$refs["handburger"].classList.toggle("open")
            this.$refs["menu"].classList.toggle("open-menu")
        },

    },
};
</script>

<style scoped>
section {
    height: 100px;
    width: 100%;
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    align-items: center;
    backdrop-filter: blur(20px);
}

.app-width {
    height: 55px;
}

.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 40px;
    height: 100%;
    align-items: center;
}

.logo {
    height: 35px;
}

.logo img {
    height: 100%;
}

.action {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    height: 100%;
}

.app {
    background: #0177fb;
    color: #ffffff;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    font-size: 20px;
    column-gap: 10px;
    font-weight: 600;
    padding: 0 20px;
    min-width: 200px;
}

.enter {
    background: transparent;
    border: #ffffff 2px solid;
    backdrop-filter: blur(20px);
    padding: 0 20px;
    min-width: 160px;
}

.networks {
    background: transparent;
    border: #ffffff 2px solid;
    backdrop-filter: blur(20px);
    padding: 0 20px;
    gap: 10px;
    width: 60px;
    min-width: fit-content;
}

.networks img {
    width: 30px;
}

.app:hover {
    background: #ffffff;
    color: #2c2d3a;
}

.nav {
    display: flex;
    justify-content: center;
}

.tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    background: #ffffff2d;
    border-radius: 30px;
    width: fit-content;
    padding: 6px 10px;
    backdrop-filter: blur(20px);
}

.tab {
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    cursor: pointer;
    user-select: none;
    border-radius: 20px;
}

.active {
    background: #0177fb;
}

.build {
    position: absolute;
    background: #2c2d3a;
    width: 300px;
    border-radius: 30px;
    top: 80px;
    left: 380px;
    overflow: hidden;
    z-index: 10;
}

.build .item {
    padding: 0 30px;
    background: #2c2d3a;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
}

.build .item:hover {
    background: #0177fb;
}

.build .item:first-child {
    padding-top: 40px;
    padding-bottom: 25px;
}

.build .item:last-child {
    padding-top: 25px;
    padding-bottom: 40px;
}

.profile {
    position: absolute;
    background: #2c2d3a;
    width: 300px;
    border-radius: 30px;
    top: 90px;
    right: 4%;
    overflow: hidden;
    z-index: 10;
    box-shadow: 6px 6px 0 #0176fb2a;
}

.profile a .item {
    padding: 0 30px;
    background: #2c2d3a;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
}

.profile a .item:hover {
    background: #0177fb;
}

.profile a .item {
    padding-top: 20px;
    padding-bottom: 20px;
}

.profile a:first-child .item {
    padding-top: 40px;
    padding-bottom: 25px;
}

.profile a:last-child .item {
    padding-top: 25px;
    padding-bottom: 40px;
}

#handburger {
    display: none;
}

@media screen and (max-width: 1400px) {
    .header {
        display: flex;
        justify-content: space-between;
    }

    .nav {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        background: #0176fbe8;
        z-index: 20;
        padding: 60px 40px;
        gap: 20px;
    }

    .tabs {
        backdrop-filter: blur(0);
        background: transparent;
        flex-direction: column;
    }

    .active {
        background: #FFFFFF;
        color: #2c2d3a;
    }

    .open-menu {
        left: 0 !important;
    }

    .tab {
        height: 50px;
    }

    .build {
        z-index: 30;
        top: 180px;
        left: unset;
        right: 40px;
    }

    .action {
        display: flex;
        align-items: center;
    }

    #handburger {
        width: 32px;
        height: 25px;
        position: relative;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.5s ease-in-out;
        -moz-transition: 0.5s ease-in-out;
        -o-transition: 0.5s ease-in-out;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }

    #handburger span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: #FFFFFF;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
    }

    #handburger span:nth-child(1) {
        top: 0px;
    }

    #handburger span:nth-child(2),
    #handburger span:nth-child(3) {
        top: 10px;
    }

    #handburger span:nth-child(4) {
        top: 20px;
    }

    #handburger.open span:nth-child(1) {
        top: 10px;
        width: 0%;
        left: 50%;
    }

    #handburger.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    #handburger.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    #handburger.open span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
    }
}

@media screen and (max-width: 1000px) {
    section {
        height: 70px;
    }

    .header {
        gap: 20px;
    }

    .logo {
        height: 24px;
    }

    .app {
        height: 45px;
        font-size: 16px;
        min-width: 160px;
    }

    .connected {
        display: none;
    }
}
</style>
