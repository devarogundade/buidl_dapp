<template>
<section>
    <div class="app-width">
        <div class="roadmap">
            <h3>Our Roadmap</h3>

            <div class="maps">
                <div class="map">
                    <p>Phase 1</p>
                    <p>Minimum Viable Product (MVP) development, participate in the Moralis x Google hackathon.</p>
                </div>

                <div class="map">
                    <p>Phase 2</p>
                    <p>Project team formation, and project restructuring.</p>
                </div>

                <div class="map">
                    <p>Phase 3</p>
                    <p>Testnet release, product testing, build community.</p>
                </div>

                <div class="map">
                    <p>Phase 4</p>
                    <p>2-3weeks early creators online bootcamp.</p>
                </div>

                <div class="map">
                    <p>Phase 5</p>
                    <p>Initial production release, and marketing, launch of BDL token and BDL NFT.</p>
                </div>

                <div class="map">
                    <p>Phase 6</p>
                    <p>List BDL token on major exchanges and airdrop to testnet community.</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
section {
    padding: 160px 0;
}

section h3 {
    font-size: 40px;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 60px;
}

.app-width {
    display: flex;
    justify-content: center;
}

.maps {
    width: 1200px;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    justify-content: center;
}

.map {
    width: 450px;
    max-width: 100%;
    padding: 30px;
    background: #2c2d3a;
    border-radius: 30px;
    box-shadow: 6px 6px 0 #0176fb2a;
}

.map p:first-child {
    font-size: 14px;
    background: #0177fb;
    color: #FFFFFF;
    width: fit-content;
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 10px;
}

.map p:last-child {
    color: #FFFFFF;
    opacity: 0.8;
    font-size: 16px;
    line-height: 24px;
}

@media screen and (max-width: 1000px) {
    .maps {
        flex-direction: column;
        align-items: center;
        gap: 40px;
        width: 400px;
    }

    .map {
        border-radius: 20px;
        padding: 20px;
        width: 400px;
    }
}

@media screen and (max-width: 700px) {
    section {
        padding: 100px 0;
    }

    section h3 {
        font-size: 30px;
    }

    .map {
        width: 350px;
    }
}
</style>
