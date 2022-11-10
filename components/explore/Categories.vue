<template>
<section>
    <div class="app-width">
        <InProgress v-if="fetching" />
        <div class="categories" v-else>
            <div class="category scaleable" v-for="(category, index) in categories" :key="index">
                <img :src="`/images/categories/${category.image}`" alt="">
                <div class="text">
                    <p>{{ category.name }}</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            fetching: true
        }
    },
    async created() {
        this.categories = await this.$firestore.fetchAll('categories')
        this.fetching = false
    },
}
</script>

<style scoped>
section {
    min-height: 100vh;
}

.categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    padding-bottom: 100px;
}

.category {
    width: 400px;
    height: 320px;
    border-radius: 20px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

.category img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
    padding: 20px;
    display: flex;
    align-items: flex-end;
}

.text p {
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 600;
}

@media screen and (max-width: 700px) {
    .categories {
        gap: 20px;
    }

    .category {
        width: 160px;
        height: 200px;
        border-radius: 16px;
    }

    .text {
        padding: 10px;
    }

    .text p {
        font-size: 20px;
    }
}
</style>
