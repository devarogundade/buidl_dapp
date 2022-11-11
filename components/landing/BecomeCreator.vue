<template>
<section id="creator">
    <div class="app-width">
        <div class="become">
            <div class="image">
                <img src="/images/instructor.png" alt="">
            </div>
            <div class="text">
                <h3>Get your contents to reach over 3000 learners around the world.</h3>
                <router-link to="/app/profile">
                    <div class="action">Become a Creator</div>
                </router-link>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
section {
    margin-top: 160px;
    padding: 60px 0;
    background: #00306e;
}

.become {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 100px;
}

.become .image {
    width: 320px;
    height: 400px;
    border-radius: 20px;
    overflow: hidden;
}

.become .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.become .text {
    width: 600px;
}

.become .text h3 {
    color: #FFFFFF;
    font-size: 36px;
    margin-bottom: 40px;
}

.become .action {
    background: #FFFFFF;
    font-size: 20px;
    height: 50px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 270px;
    font-family: 'regular';
    font-weight: 600;
    color: black;
}

@media screen and (max-width: 700px) {
    section {
        margin-top: 100px;
    }

    .become {
        gap: 40px;
    }

    .become .image {
        width: 100%;
        height: 320px;
    }

    .become .text h3 {
        font-size: 24px;
        margin-bottom: 40px;
    }

    .become .action {
        font-size: 18px;
        width: 220px;
    }
}
</style>
