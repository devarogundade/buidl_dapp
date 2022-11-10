<template>
<section id="bdl-nft">
    <div class="app-width">
        <div class="token">
            <h3>Buidl Monkey NFT</h3>
            <p class="desc">The Buidl Monkey NFT serves as a coupon(discount) on premium contents, each nft has a weight property which ranges from 0 ~ 50, this weight property is the percentage of the nft discount.</p>

            <div class="images">
                <img v-for="index in 4" :key="index" :src="`/images/nft${index}.jpg`" class="scaleable" alt="">
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
section {
    padding-top: 160px;
}

section h3 {
    font-size: 40px;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 20px;
}

.app-width {
    display: flex;
    justify-content: center;
}

.token {
    width: 600px;
    max-width: 100%;
}

.desc {
    color: #FFFFFF;
    text-align: center;
    font-size: 18px;
    line-height: 26px;
}

.images {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    flex-wrap: wrap;
}

.images img {
    width: 100px;
    height: 140px;
    border-radius: 10px;
    object-fit: cover;
}

@media screen and (max-width: 700px) {
    section {
        padding-top: 100px;
    }

    section h3 {
        font-size: 30px;
    }

    .desc {
        font-size: 16px;
        line-height: 24px;
    }
}
</style>
