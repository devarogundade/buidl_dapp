<template>
<section>
    <div class="app-width">
        <div class="grid">
            <div class="hero">
                <div class="text">
                    <h3>Earn from learning.</h3>
                    <p>
                        Get a valuable NFTs you can sell or use them for a coupon for your next course.
                    </p>
                </div>
                <div class="action scaleable">
                    Learn more <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
            </div>
            <div class="hero">
                <div class="text">
                    <h3>Become a Creator.</h3>
                    <p>
                        Create free (and/or) premium contents to teach others your special skills.
                    </p>
                </div>
                <div class="action scaleable">
                    Learn more <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    async mounted() {},
};
</script>

<style scoped>
.app-width {
    padding-top: 160px;
    padding-bottom: 100px;
    position: relative;
}

.grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 40px;
}

.hero {
    width: 620px;
    max-width: 100%;
    padding: 40px;
    border-radius: 10px;
    background: rgb(34, 114, 200);
    background-image: url("/images/bg-noise.png");
    z-index: 1;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: flex-end;
}

.hero:nth-child(2) {
    background: rgb(200, 34, 111);
}

.text {
    color: #fff;
}

.text h3 {
    font-size: 34px;
    font-family: 'regular';
}

.text p {
    font-size: 20px;
    margin-top: 10px;
}

.action {
    display: flex;
    gap: 10px;
    width: 230px;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    background: #fff;
    border-radius: 30px;
    padding: 0 20px;
    height: 50px;
    user-select: none;
    cursor: pointer;
}

@media screen and (max-width: 800px) {
    .app-width {
        padding-top: 100px;
        padding-bottom: 50px;
    }

    .grid {
        gap: 20px;
    }

    .hero {
        padding: 20px;
        flex-direction: column;
    }

    .text h3 {
        font-size: 24px;
    }

    .text p {
        font-size: 16px;
    }

    .action {
        width: fit-content;
        font-size: 16px;
        height: 40px;
    }
}
</style>
