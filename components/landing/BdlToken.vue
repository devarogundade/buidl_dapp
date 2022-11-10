<template>
<section id="bdl-token">
    <div class="app-width">
        <div class="token">
            <h3>Tokenomics</h3>
            <p class="desc">The total supply of BDL is 10,000,000,000 tokens, all minted at once. BDL Tokens will be distributed among 4 main groups:</p>

            <div class="action">
                <router-link to="/mint">
                    <div class="mint">$BDL Faucet</div>
                </router-link>
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

.action {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.mint {
    height: 50px;
    width: 180px;
    border-radius: 10px;
    background: #0177fb;
    font-size: 16px;
    color: #FFFFFF;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
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
