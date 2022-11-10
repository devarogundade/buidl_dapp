<template>
<div class="container">
    <div class="nfts">
        <div class="tabs">
            <h3 :class="tab == 1 ? 'active' : ''" v-on:click="tab = 1">Wallet</h3>
            <h3 :class="tab == 2 ? 'active' : ''" v-on:click="tab = 2">
                Certificates
            </h3>
            <h3 :class="tab == 3 ? 'active' : ''" v-on:click="tab = 3">My NFTs</h3>
        </div>

        <div class="items" v-show="tab == 1">
            <div class="balances">
                <div class="wallet">
                    <div>
                        <img src="/images/bnb_coin.png" alt="" />
                        <p>
                            {{ Number($utils.fromWei(balance)).toFixed(4) }} <b>tBNB</b>
                        </p>
                    </div>
                </div>
                <div class="wallet">
                    <div>
                        <img src="/favicon.ico" alt="" />
                        <p v-if="token">
                            {{ Number($utils.fromWei(token.balance)) }}
                            <b>{{ token.symbol }}</b>
                        </p>
                        <p v-else>0.00 <b>BDL</b></p>
                    </div>
                </div>

                <div class="wallet">
                    <div>
                        <img src="/favicon.ico" alt="" />
                        <p v-if="staked">
                            {{ Number($utils.fromWei(staked)) }} <b>sBDL</b>
                        </p>
                        <p v-else>0.00 <b>sBDL</b></p>
                    </div>
                    <div>UnStake</div>
                </div>
            </div>
        </div>

        <div class="items" v-show="tab == 2">
            <div class="explain" v-show="certificates.length == 0 && !fetching2">
                <h3>What's Certificate?</h3>
                <p>
                    <b>Buidl Monkey NFT</b> serves as a coupon(discount) on premium
                    contents, each nft has a weight property which ranges from 0 ~ 50,
                    this weight property is the percentage of the nft discount.
                </p>
            </div>

            <div class="item" v-show="certificates.length > 0" v-for="(certificate, index) in certificates" :key="index">
                <div class="image">
                    <embed :src="toJson(certificate.metadata).attributes[0].value" alt="" class="embed" />
                </div>
                <div class="certificate">
                    <ul>
                        <li>
                            <i class="fa-solid fa-hashtag"></i>
                            <a href="" target="_blank">
                                <p>{{ certificate.name }} <b>{{ certificate.symbol }}</b></p>
                            </a>
                        </li>
                    </ul>
                </div>
                <a target="_blank" :href="`https://testnet.bscscan.com/token/${certificate.token_address}?a=${certificate.token_id}#inventory`">
                    <div class="action">
                        <div class="stake">
                            View on Explorer <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </div>
                    </div>
                </a>
            </div>
        </div>

        <div class="items" v-show="tab == 3">
            <div class="explain" v-show="nfts.length == 0 && !fetching3">
                <h3>What's Buidl NFT?</h3>
                <p>
                    <b>Buidl Monkey NFT</b> serves as a coupon(discount) on premium
                    contents, each nft has a weight property which ranges from 0 ~ 50,
                    this weight property is the percentage of the nft discount.
                </p>
            </div>

            <div class="item" v-show="nfts.length > 0" v-for="(nft, index) in nfts" :key="index">
                <div class="image">
                    <img src="/images/nft2.jpg" alt="" />
                </div>
                <div class="creator">
                    <div class="profile">
                        <img src="/favicon.ico" alt="" />
                        <div class="name">
                            <p>{{ nft.name }}</p>
                            <p>ID: {{ nft.token_id }}</p>
                        </div>
                    </div>
                    <div class="stat">
                        <p>{{ nft.symbol }}</p>
                        <p class="price">
                            Discount <span>{{ 4 }}%</span>
                            <!--- To do from smart contract NFT discount mechanism -->
                        </p>
                    </div>
                </div>
                <a target="_blank" :href="`https://testnets.opensea.io/assets/bsc-testnet/${nft.token_address}/${nft.token_id}`">
                    <div class="action">
                        <div class="stake">
                            Opensea <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            tab: 1,
            nfts: [],
            certificates: [],
            token: null,
            staked: null,
            fetching1: true,
            fetching2: true,
            fetching3: true,
            balance: 0,
        };
    },
    created() {
        this.getNfts();
        this.getCertificates();
        this.getNativeBalance();
        this.getTokenBalances();
        this.$contracts.initStakingContract(this.$auth.provider);
        $nuxt.$on("staking-contract", (contract) => {
            this.getStakedBalance(contract);
        });
    },
    methods: {
        getNfts: async function () {
            if (this.$auth.accounts.length == 0) return;
            const nfts = await this.$nft.getUserNfts(this.$auth.accounts[0]);
            if (nfts != null) {
                this.nfts = nfts;
            }
            this.fetching3 = false;
        },

        getCertificates: async function () {
            if (this.$auth.accounts.length == 0) return;
            const certificates = await this.$nft.getCertificates(this.$auth.accounts[0]);
            console.log(certificates);
            if (certificates != null) {
                this.certificates = certificates;
            }
            this.fetching2 = false;
        },

        toJson: function (json) {
            if (json == null) {
                return {
                    name: "No name",
                    description: "No description",
                    image: "",
                    attributes: [{
                        display_type: "boost_percentage",
                        trait_type: "Weight",
                        value: 0,
                    }, ],
                };
            }
            return JSON.parse(json);
        },

        getNativeBalance: async function () {
            if (this.$auth.accounts.length == 0) return;
            const response = await this.$token.getNativeBalance(
                this.$auth.accounts[0]
            );
            if (!response) return;
            this.balance = response.balance;
        },

        getTokenBalances: async function () {
            if (this.$auth.accounts.length == 0) return;
            const response = await this.$token.getTokenBalances(
                this.$auth.accounts[0]
            );
            const token = response.filter(
                (_token) =>
                _token.token_address.toLowerCase() ==
                process.env.TOKEN_CONTRACT_ADDRESS.toLowerCase()
            );
            if (token.length > 0) {
                this.token = token[0];
            }
            this.fetching1 = false;
        },

        getStakedBalance: async function (contract) {
            if (this.$auth.accounts.length == 0) return;
            const stake = await contract.stakes(this.$auth.accounts[0]);
            this.staked = stake.amount;
        },
    },
};
</script>

<style scoped>
.container {
    padding-top: 120px;
    padding-bottom: 50px;
}

.explain {
    border-radius: 30px;
    max-width: 90%;
    width: 400px;
    background: #23242f;
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 24px;
    color: #ffffff;
    padding: 30px;
    position: absolute;
}

.explain h3 {
    font-size: 30px;
    font-family: "Poppins", sans-serif;
}

.explain p {
    margin-top: 20px;
    font-size: 18px;
    line-height: 24px;
}

.explain .action {
    margin-top: 40px;
    background: #0177fb;
    padding: 8px 10px;
    border-radius: 16px;
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    font-weight: 600;
}

.action i {
    padding: 4px;
    border-radius: 50%;
    background: #ffffff;
    color: #0177fb;
}

.nfts {
    width: 100%;
}

.tabs {
    display: flex;
    align-items: center;
    gap: 30px;
}

.tabs h3 {
    font-size: 40px;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
}

.tabs .active {
    color: rgb(255, 208, 0);
    text-decoration: underline;
}

.items {
    display: flex;
    gap: 40px;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 40px;
    overflow: hidden;
}

.items .item {
    width: 300px;
    background: #2c2d3a;
    border-radius: 16px;
}

.item .name p:first-child {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.item .name p:last-child {
    font-size: 12px;
}

.items .image {
    height: 340px;
    border: 2px #ffffff solid;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    overflow: hidden;
}

.items .image img {
    width: 100%;
    height: 100%;
}

.creator {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.profile {
    display: flex;
    align-items: center;
    gap: 10px;
}

.creator img {
    width: 30px;
    height: 30px;
    border-radius: 20px;
    object-fit: cover;
}

.creator {
    color: #ffffff;
}

.creator .price {
    font-size: 14px;
    margin-top: 4px;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    gap: 4px;
}

.creator span {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 6px;
    color: #003f2c;
    background: #53f3c3;
}

.action {
    padding: 20px;
    padding-top: 0;
}

.item .stat {
    text-align: right;
}

.item .stat p:first-child {
    font-size: 14px;
}

.stake {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #ffffff;
    background: #0177fb;
    gap: 10px;
    border-radius: 12px;
}

.balances {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    gap: 40px;
}

.wallet {
    display: flex;
    gap: 20px;
    align-items: center;
    background: #2c2d3a;
    justify-content: space-between;
    padding: 12px;
    padding-right: 30px;
    border-radius: 40px;
    width: 100%;
}

.wallet div:first-child {
    display: flex;
    align-items: center;
    gap: 20px;
}

.wallet div:nth-child(2) {
    font-size: 20px;
    width: 180px;
    border-radius: 20px;
    height: 50px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #23242f !important;
    cursor: pointer;
    user-select: none;
    justify-content: center;
    background: #ffffff;
}

.wallet p {
    font-size: 60px;
    color: #ffffff;
}

.wallet img {
    width: 70px;
    height: 70px;
    border-radius: 40px;
    object-fit: cover;
}

.embed {
    height: 100%;
    width: 100%;
}

.certificate {
    padding: 20px;
}

li {
    display: flex;
    align-items: center;
    gap: 10px;
}

li i {
    color: #ffffff;
}

li a {
    color: #0177fb;
    text-decoration: underline;
}

@media screen and (max-width: 700px) {
    .tabs h3 {
        font-size: 20px;
    }

    .items {
        justify-content: center;
        gap: 20px;
    }

    .wallet p {
        font-size: 30px;
    }

    .wallet img {
        width: 30px;
        height: 30px;
    }
}
</style>
