<template>
<section v-if="message != null">
    <div class="page-width">
        <div class="error">{{ message }}</div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            message: null
        }
    },
    mounted() {
        $nuxt.$on('error', (message) => {
            this.message = message

            setTimeout(() => {
                this.message = null
            }, 1000);
        })
    }
}
</script>

<style scoped>
section {
    background: #C74F4F;
    position: fixed;
    left: 0;
    top: 100px;
    width: 100%;
    z-index: 1000;
    padding-top: 0 !important;
}

.error {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #F9F6ED;
    padding: 20px;
    text-transform: capitalize;
}

@media screen and (max-width: 1100px) {
    section {
        top: 76px;
    }
}

@media screen and (max-width: 1100px) {
    section {
        top: 76px;
    }

    .error {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        padding: 10px;
    }
}
</style>
