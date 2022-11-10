<template>
<section>
    <div class="app-width">
        <div class="footer">
            <div class="logo">
                <img src="/images/logo.png" alt="">
            </div>
            <div class="links">
                <a href="#bdl-token">BDL Token</a>
                <a href="https://moralis.io/google-hackathon/" target="_blank">Moralis x Google Hackathon</a>
            </div>
            <div class="socials">
                <a href="https://github.com/devarogundade/buidl" target="_blank"><i class="fa-brands fa-github"></i></a>
            </div>
        </div>
    </div>
</section>
</template>

<style scoped>
section {
    padding: 40px 0;
    border-top: 2px solid rgb(0, 18, 97);
    background: rgba(0, 0, 0, 0.2);
}

.footer {
    display: grid;
    grid-template-columns: 150px auto 150px;
    gap: 40px;
    min-height: 50px;
    align-items: center;
}

.logo img {
    height: 35px;
}

.links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.links a {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
}

.socials {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 40px;
}

.socials i {
    font-size: 30px;
    color: #fff;
}

@media screen and (max-width: 1000px) {
    .footer {
        grid-template-columns: auto;
    }

    .links {
        flex-direction: column;
        text-align: center;
        gap: 30px;
    }
}
</style>
