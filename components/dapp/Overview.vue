<template>
<div class="container">
    <div class="overview">
        <div class="verify" v-if="!fetching && ($utils.fromWei(staked) < 2000)">
            <p><i class="fa-solid fa-circle-exclamation"></i> Stake {{ 2000 - $utils.fromWei(staked) }} BDL to become a creator</p>
            <router-link to="/collectibles/stake">
                <p class="stake scaleable">Stake now</p>
            </router-link>
        </div>

        <div class="verify" v-if="!fetching && user == null">
            <p><i class="fa-solid fa-circle-exclamation"></i> Set up your profile</p>
            <router-link to="/app/profile">
                <p class="stake scaleable">Set Profile</p>
            </router-link>
        </div>

        <div class="verify" v-if="!fetching && (user && user.verified)">
            <p><i class="fa-solid fa-circle-exclamation"></i> Hi!, create a new course</p>
            <router-link to="/app/courses/create">
                <p class="stake scaleable">Create now</p>
            </router-link>
        </div>

        <div class="tab" v-if="(user && user.verified)">
            <div class="analytics">
                <div class="title">
                    <i class="fa-solid fa-chart-pie"></i>
                    <p>Analytics</p>
                </div>
                <div class="desc">Measure your growth and subscribers.</div>
                <div class="list">
                    <div class="analytic">
                        <div>
                            <i class="fa-solid fa-user-graduate"></i>
                            <p>Active Subscribers</p>
                        </div>
                        <div>
                            <h3>2</h3>
                            <router-link to="">View all <i class="fa-solid fa-arrow-right"></i></router-link>
                        </div>
                    </div>

                    <div class="analytic">
                        <div>
                            <i class="fa-solid fa-chart-line"></i>
                            <p>Course Impressions</p>
                        </div>
                        <div>
                            <h3>9</h3>
                            <router-link to="">View all <i class="fa-solid fa-arrow-right"></i></router-link>
                        </div>
                    </div>

                    <div class="analytic">
                        <div>
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <p>Search Appearances</p>
                        </div>
                        <div>
                            <h3>2</h3>
                            <router-link to="">View all <i class="fa-solid fa-arrow-right"></i></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab" v-if="(user && user.verified)">
            <div class="linkedin">
                <div class="title">
                    <img src="/images/linkedin.png" alt="">
                    <p>Connect to LinkedIn</p>
                </div>
                <div class="desc">Attach your professional LinkedIn account to your profile.</div>
                <div class="connect">
                    <div class="image">
                        <img src="/images/linkedin-buidl.png" />
                    </div>

                    <div class="sign_up" v-if="!connecting" v-on:click="save()">Connect</div>
                    <div class="sign_up" v-else>Connecting..</div>
                </div>
            </div>
        </div>

        <div class="tab">
            <router-link to="/app/course">
                <div class="supporters">
                    <h3>Courses</h3>
                </div>
            </router-link>
        </div>

        <div class="tab">
            <router-link to="/collectibles">
                <div class="supporters">
                    <h3>Coupon NFT</h3>
                </div>
            </router-link>
        </div>

        <div class="tab">
            <router-link to="/collectibles">
                <div class="supporters">
                    <h3>Certificates</h3>
                </div>
            </router-link>
        </div>

        <!-- <div class="tab">
            <div class="supporters">
                <div class="title">
                    <i class="fa-solid fa-heart-circle-bolt"></i>
                    <p>Subscribed Courses</p>
                </div>
                <p class="desc">Trades from your supporter. <a href="">Click here</a> to learn how you can grow your supporters.</p>
                <div class="trades">
                    <div class="trade">
                        <img src="/images/nft1.jpg" alt="">
                        <div class="user">
                            <p>John Doe</p>
                            <p><span class="bought">Purchased</span> JavaScript</p>
                        </div>
                        <div class="price">
                            <p class="amount">+20 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                    <div class="trade">
                        <img src="/images/nft2.jpg" alt="">
                        <div class="user">
                            <p>Arogundade Ibrahim</p>
                            <p><span class="sold">Returned</span> Royalty NFT</p>
                        </div>
                        <div class="price">
                            <p class="amount">-15 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                    <div class="trade">
                        <img src="/images/nft3.jpg" alt="">
                        <div class="user">
                            <p>Mikel Salor</p>
                            <p><span class="sold">Returned</span> Kotlin</p>
                        </div>
                        <div class="price">
                            <p class="amount">-20 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                    <div class="trade">
                        <img src="/images/nft4.jpg" alt="">
                        <div class="user">
                            <p>Savage Bethel</p>
                            <p><span class="bought">Purchased</span> Cooking rice</p>
                        </div>
                        <div class="price">
                            <p class="amount">+20 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                </div>
                <router-link to="/app/courses">
                    <p class="all-trades">All courses <i class="fa-solid fa-arrow-right"></i></p>
                </router-link>
            </div>
        </div> -->

        <!-- <div class="tab">
            <div class="supporters">
                <div class="title">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <p>NTFs</p>
                </div>
                <p class="desc">Trades from your supporter. <a href="">Click here</a> to learn how you can grow your supporters.</p>
                <div class="trades">
                    <div class="trade">
                        <img src="/images/nft1.jpg" alt="">
                        <div class="user">
                            <p>Android Development</p>
                            <p><span class="bought">Purchased</span> JavaScript</p>
                        </div>
                        <div class="price">
                            <p class="amount">20 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                    <div class="trade">
                        <img src="/images/nft2.jpg" alt="">
                        <div class="user">
                            <p>Arogundade Ibrahim</p>
                            <p><span class="sold">Sold</span> Royalty NFT</p>
                        </div>
                        <div class="price">
                            <p class="amount">20 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                    <div class="trade">
                        <img src="/images/nft3.jpg" alt="">
                        <div class="user">
                            <p>Mikel Salor</p>
                            <p><span class="sold">Sold</span> Royalty NFT</p>
                        </div>
                        <div class="price">
                            <p class="amount">20 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                    <div class="trade">
                        <img src="/images/nft4.jpg" alt="">
                        <div class="user">
                            <p>Savage Bethel</p>
                            <p><span class="bought">Bought</span> Swags NFT</p>
                        </div>
                        <div class="price">
                            <p class="amount">20 BDL</p>
                            <a href="">
                                <p class="date">Ox4940...</p>
                            </a>
                        </div>
                    </div>
                </div>
                <router-link to="/collectibles">
                    <p class="all-trades">All NTFs <i class="fa-solid fa-arrow-right"></i></p>
                </router-link>
            </div>
        </div> -->
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            fetching: true,
            user: null,
            staked: null,
            buidlContract: this.$contracts.buidlContract,
            provider: this.$auth.provider,
            connecting: false
        }
    },
    async created() {
        this.getUser()

        this.$contracts.initStakingContract(this.$auth.provider)
        $nuxt.$on('staking-contract', (contract) => {
            this.getStakedBalance(contract)
        })
    },
    methods: {
        getStakedBalance: async function (contract) {
            if (this.$auth.accounts.length == 0) return
            const stake = await contract.stakes(this.$auth.accounts[0])
            this.staked = stake.amount
        },
        getUser: async function () {
            if (this.$auth.accounts.length == 0) return
            this.user = await this.$firestore.fetch("users", this.$auth.accounts[0].toUpperCase())
            this.fetching = false
        }
    }
}
</script>

<style scoped>
.container {
    width: 100% !important;
    display: flex;
    justify-content: center;
    padding-top: 120px;
    padding-bottom: 50px;
}

.overview {
    display: flex;
    flex-wrap: wrap;
    width: 100% !important;
    justify-content: center;
    gap: 40px;
}

.tab {
    border-radius: 10px;
    background: #23242F;
    overflow: hidden;
    max-width: 100%;
}

.verify {
    width: 100%;
    max-width: 940px;
    border-radius: 10px;
    background: #23242F;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
    height: 100px;
    gap: 60px;
}

.verify p:first-child {
    font-size: 20px;
    color: #638dff;
}

.verify .stake {
    font-size: 20px;
    width: 180px;
    border-radius: 20px;
    height: 50px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #23242F !important;
    cursor: pointer;
    user-select: none;
    justify-content: center;
    background: #FFFFFF;
}

.analytics {
    width: 500px;
}

.linkedin {
    width: 400px;
}

.tab .title {
    display: flex;
    align-items: center;
    background: #3B3C4E;
    padding: 20px;
    padding-bottom: 10px;
    gap: 10px;
}

.tab .title img {
    height: 30px;
}

.tab .title i {
    font-size: 22px;
    color: #fff;
}

.tab .title p {
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
}

.desc {
    padding: 20px;
    font-size: 15px;
    line-height: 24px;
    color: #fff;
}

.linkedin .connect {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 20px;
}

.linkedin .image {
    width: 180px;
}

.linkedin .image img {
    width: 100%;
    border-radius: 26px;
}

.linkedin .sign_up {
    height: 40px;
    background: linear-gradient(90deg, #4b87f6 -43.68%, #3451f3 72.76%);
    border-radius: 20px;
    width: 160px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    user-select: none;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
    color: #FFFFFF;
}

.analytics .list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 20px;
    column-gap: 20px;
}

.analytic div {
    display: flex;
    color: #fff;
    font-weight: 600;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    gap: 10px;
}

.analytic div:first-child {
    height: 60px;
}

.analytic div:last-child {
    flex-direction: column;
    margin-top: 10px;
    align-items: flex-start;
    padding: 0 10px;
}

.analytic div:last-child h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    line-height: 30px;
    letter-spacing: 0.01em;
    color: #fff;
}

.analytic a {
    color: #0177fb;
    font-weight: 600;
    text-decoration: underline;
}

.supporters {
    width: 450px;
}

.supporters .trades {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.trades .trade {
    display: grid;
    gap: 20px;
    grid-template-columns: 40px auto 100px;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px #3B3C4E solid;
}

.trade:first-child {
    border-top: 1px #3B3C4E solid;
}

.trades img {
    width: 40px;
    height: 50px;
    border-radius: 10px;
    object-fit: cover;
}

.trade .user {
    color: rgb(228, 228, 228);
}

.desc a {
    color: #3451f3;
    font-weight: 600;
}

.trade .user p:first-child {
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 6px;
}

.trade .user p:last-child {
    font-size: 14px;
    color: #a3a3a3;
}

.trade span {
    padding: 2px 6px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    opacity: 1;
}

.trade .sold {
    background: #FF6370;
    color: #490006;
}

.trade .bought {
    background: #53F3C3;
    color: #01412d;
}

.trade .price {
    text-align: right;
}

.trade .amount {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    color: #0177fb;
}

.trade .date {
    font-size: 14px;
    color: #a3a3a3;
}

.supporters .all-trades {
    text-align: center;
    padding: 20px;
    padding-top: 10px;
    color: #0177fb;
    font-weight: 600;
    text-decoration: underline;
}

.supporters {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.supporters h3 {
    color: #fff;
    font-size: 34px;
}

@media screen and (max-width: 1300px) {
    .overview {
        flex-direction: column;
        align-items: center;
    }

    .linkedin,
    .supporters,
    .analytics {
        width: 100%;
        max-width: 450px;
    }
}

@media screen and (max-width: 700px) {
    .verify {
        padding: 10px 20px;
    }

    .verify p:first-child {
        font-size: 16px;
    }

    .verify p:last-child {
        font-size: 16px;
        width: 160px;
        height: 40px;
    }
}
</style>
