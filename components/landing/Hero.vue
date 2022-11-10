<template>
<section>
    <div class="bg"><img src="/images/Ellipse1.ee547e.png" alt=""></div>
    <div class="bg2"><img src="/images/ellipse-topleft.svg" alt=""></div>
    <div class="app-width">
        <div class="hero">
            <div class="grid">
                <div class="text">
                    <h3>Learn without limits. <br> <span>Create</span> contents.</h3>
                    <p>Building a Borderless, Permissionless and Decentralized Social-Fi for Creators and Learners.</p>
                    <router-link to="/explore">
                        <div class="feeds">Explore <i class="fa-solid fa-arrow-right"></i></div>
                    </router-link>
                </div>
                <div class="image">
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="index in 10" :key="index">
                                <img :src="`/images/students/${index}.jpg`">
                                <div class="profile">
                                    <div>
                                        <h3>John Doe</h3>
                                        <i class="fa-brands fa-twitter"></i>
                                    </div>
                                    <p>Lorem ipsum dolor sit, amet consec tetur adip isicing elit. Repre hende, commodi eius corrupti.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stats">
                    <div class="stat">
                        <h3>5+</h3>
                        <p>Active creators</p>
                    </div>
                    <div class="stat">
                        <h3>1,392 $BDL</h3>
                        <p>Earned by the community</p>
                    </div>
                    <div class="stat">
                        <h3>26+</h3>
                        <p>Uploaded courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        try {
            new Swiper(".mySwiper", {
                effect: "cards",
                grabCursor: true,
                loop: true,
                autoplay: true,
                delay: 3000,
                disableOnInteraction: false
            });
        } catch (error) {}
    },
}
</script>

<style scoped>
section {
    overflow: hidden;
    min-height: 100vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: #001731;
}

.bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 500px;
    max-width: 100%;
    opacity: 0.15;
}

.bg img {
    width: 100%;
}

.bg2 {
    position: absolute;
    right: 100px;
    bottom: -150px;
    width: 1000px;
    max-width: 100%;
    opacity: 0.15;
    rotate: 90deg;
}

.bg2 img {
    width: 100%;
}

.swiper {
    width: 350px;
}

.swiper-slide {
    border-radius: 30px;
    background: #2C2D3A;
    padding: 20px;
}

.swiper-slide img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 6px 6px 0 #0176fb2a;
}

.hero {
    padding: 200px 0;
    height: 100%;
}

.grid {
    column-gap: 200px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 200px;
    row-gap: 100px;
    align-items: center;
}

.text {
    width: 600px;
    max-width: 100%;
}

.text h3 {
    font-size: 50px;
    line-height: 60px;
    font-family: 'Poppins', sans-serif;
    color: #fff;
}

.text h3 span {
    background: -webkit-linear-gradient(#e3ffe1, rgb(23, 236, 23));
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.text p {
    font-size: 28px;
    line-height: 32px;
    color: #FFFFFF;
    font-weight: 600;
    margin-top: 20px;
}

.text .feeds {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    background: #FF6370;
    color: #2C2D3A;
    margin-top: 60px;
    width: 200px;
    border-radius: 8px;
    font-size: 24px;
    font-weight: 600;
    column-gap: 20px;
}

.stats {
    display: flex;
    width: 100%;
    column-gap: 100px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
}

.stat h3 {
    font-size: 40px;
    color: #fff;
    font-weight: 600;
    font-family: bold;
}

.stat p {
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    opacity: 0.8;
}

.profile>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 10px;
}

.profile i {
    color: #0177fb;
    font-size: 20px;
}

.profile h3 {
    font-size: 18px;
    color: #FFFFFF;
}

.profile p {
    opacity: 0.8;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 22px;
}

@media screen and (max-width: 1000px) {
    .stat {
        text-align: center;
    }

    .stat h3 {
        font-size: 28px;
    }

    .stat p {
        font-size: 20px;
        font-weight: 500;
    }
}

@media screen and (max-width: 1000px) {
    .text h3 {
        font-size: 34px;
        line-height: 40px;
    }

    .text p {
        font-size: 20px;
    }

    .hero {
        padding: 160px 0;
    }

    .text .feeds {
        height: 45px;
        margin-top: 40px;
        width: 180px;
        font-size: 20px;
    }

    .swiper {
        width: 300px;
    }

    .swiper-slide img {
        height: 280px;
    }
}
</style>
