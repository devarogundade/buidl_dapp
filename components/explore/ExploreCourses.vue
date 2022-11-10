<template>
<section>
    <div class="app-width">
        <div class="container">
            <InProgress v-if="fetching" />
            <div class="category" v-else v-for="(category, index) in categories" :key="index">
                <div class="title">
                    <div>
                        <img :src="`/images/categories/${category.image}`" alt="">
                        <h3>{{ category.name }}</h3>
                    </div>
                    <div class="action">View all <i class="fa-solid fa-arrow-right-long"></i></div>
                </div>
                <div class="trending">
                    <div class="swiper trendSwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(course, index) in filterCourses(category.id)" :key="index">
                                <div class="image">
                                    <img :src="course.photo" alt="">
                                </div>
                                <div class="detail">
                                    <h3 class="course_title">{{ course.name }}</h3>
                                    <p class="instructor"> <img :src="course.creator.photo" alt=""> {{ course.creator.name }} </p>
                                    <p class="ratings"><i class="fa-solid fa-star"></i> 4.7 of 5.0 &nbsp; • &nbsp; 235 students</p>
                                    <p class="price">{{ course.price ? $utils.fromWei(course.price) : '..' }} $BDL</p>
                                </div>

                                <div class="description">
                                    <div class="detail">
                                        <p class="price">{{ course.price ? $utils.fromWei(course.price) : '..' }} $BDL</p>
                                        <h3 class="course_title">{{ course.name }}</h3>
                                        <p class="instructor"> <img :src="course.creator.photo" alt=""> {{ course.creator.name }} </p>
                                        <p class="ratings"><i class="fa-solid fa-star"></i> 4.7 of 5.0 &nbsp; • &nbsp; 235 students</p>
                                        <p class="sections">Sections</p>
                                        <ul>
                                            <li v-for="index in 3" :key="index">{{ `Sample Section ${index}` }}</li>
                                            <p class="more_sections">+2 sections</p>
                                        </ul>
                                        <div class="action">
                                            <router-link :to="`/explore/courses/${course.id}`">
                                                <div class="buy">View Course</div>
                                            </router-link>
                                            <i class="fa-solid fa-heart-circle-plus"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
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
        return {
            categories: [],
            courses: [],
            fetching: true
        }
    },
    async created() {
        await this.getCategories()
        await this.getCourses()
    },
    updated() {
        const perView = this.$utils.slidesPerView()

       try {
         new Swiper(".trendSwiper", {
            slidesPerView: perView,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
       } catch (error) {

       }
    },
    methods: {
        async getCategories() {
            this.categories = await this.$firestore.fetchAll('categories')
        },
        async getCourses() {
            this.courses = await this.$firestore.fetchAllWithCreator('courses')
            this.fetching = false
        },
        filterCourses(id) {
            return this.courses.filter(course => course.category == id)
        }
    }
}
</script>

<style scoped>
.container {
    min-height: 100vh;
}

.category {
    margin-bottom: 60px;
}

.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 10px;
}

.title h3 {
    font-size: 30px;
    color: #fff;
}

.title div:first-child {
    display: flex;
    align-items: center;
    gap: 20px;
}

.title img {
    width: 50px;
    height: 45px;
    object-fit: cover;
    border-radius: 10px;
}

.title div:last-child {
    background: #0177fb;
    padding: 2px 16px;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    margin: 0;
}

.swiper {
    width: 100%;
    padding-bottom: 40px;
}

.swiper-slide {
    background: #2C2D3A;
    border-radius: 20px;
    user-select: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.swiper-slide .image {
    height: 250px;
    width: 100%;
}

.swiper-slide .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-slide .detail {
    padding: 20px;
}

.detail .course_title {
    font-weight: 600;
    color: #e9e9e9;
    margin-bottom: 20px;
    min-height: 50px;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.detail .instructor {
    font-size: 16px;
    color: #fff;
    display: flex;
    align-items: center;
}

.instructor img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 20px;
    margin-right: 10px;
}

.detail .ratings {
    margin-top: 10px;
    color: #a0a0a0;
}

.ratings i {
    color: rgb(255, 187, 0);
}

.price {
    padding: 6px 16px;
    border-radius: 6px;
    margin-top: 20px;
    background: #355f8f;
    font-family: 'Poppins';
    width: fit-content;
    color: #fff;
}

.description {
    height: 100%;
    width: 100%;
    background: #2C2D3A;
    position: absolute;
    right: 0%;
    bottom: -100%;
    z-index: 1;
    opacity: 0.5;
}

.swiper-slide:hover .description {
    bottom: 0;
    opacity: 1;
}

.description .price {
    margin-top: 0;
}

.description .course_title {
    margin-top: 20px;
}

.sections {
    background: #a0a0a0;
    color: #2C2D3A;
    padding: 4px 12px;
    border-radius: 6px;
    width: fit-content;
    font-weight: 600;
    margin-top: 20px;
}

ul {
    list-style: square;
}

ul li {
    padding: 10px 4px;
    color: #e9e9e9;
    font-size: 14px;
    border-bottom: 1px #a0a0a0 solid;
}

.more_sections {
    padding: 10px 4px;
    font-size: 12px;
    color: #7dbaff;
}

.action {
    display: grid;
    grid-template-columns: auto 50px;
    column-gap: 10px;
    height: 40px;
    margin-top: 10px;
}

.action .buy {
    background: #0177fb;
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
}

.swiper-slide .action i {
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px rgb(255, 209, 5) solid;
    font-size: 20px;
    color: #fff;
}

@media screen and (max-width: 700px) {
    .title h3 {
        font-size: 20px;
    }

    .title div:first-child {
        gap: 10px;
    }

    .title img {
        width: 40px;
        height: 35px;
    }
}
</style>
