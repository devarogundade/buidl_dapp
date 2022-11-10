<template>
<div class="nav">
    <div class="items">
        <router-link v-show="$route.name.includes('app-course-builder')" :to="`/app/course-builder/${$route.params.course}`">
            <div :class="$route.name == 'app-course-builder-course' ? 'item active' : 'item'">
                <i class="fa-solid fa-pen-to-square"></i>
                <p>Edit Content</p>
            </div>
        </router-link>

        <router-link v-show="$route.name.includes('app-courses-course')" :to="`/app/courses/${$route.params.course}`">
            <div :class="$route.name == 'app-courses-course' ? 'item active' : 'item'">
                <i class="fa-solid fa-book"></i>
                <p>Study</p>
            </div>
        </router-link>

        <router-link v-show="$route.name.includes('app-course-builder')" :to="`/app/course-builder/${$route.params.course}/chat`">
            <div :class="$route.name == 'app-course-builder-course-chat' ? 'item active' : 'item'">
                <i class="fa-solid fa-comments"></i>
                <p>Subscribers</p>
            </div>
        </router-link>

        <router-link v-show="$route.name.includes('app-courses-course')"  :to="`/app/courses/${$route.params.course}/chat`">
            <div :class="$route.name == 'app-courses-course-chat' ? 'item active' : 'item'">
                <i class="fa-solid fa-comments"></i>
                <p>Chat Creator</p>
            </div>
        </router-link>

        <router-link v-show="$route.name.includes('app-course-builder')" :to=" `/app/course-builder/${$route.params.course}/settings`">
            <div :class="$route.name == 'app-course-builder-course-settings' ? 'item active' : 'item'">
                <i class="fa-solid fa-gear"></i>
                <p>Settings</p>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            tab: 1,
        }
    },
    mounted() {
        $nuxt.$on('dapp-tab', (tab) => {
            this.tab = tab
        })
    }
}
</script>

<style scoped>
.nav {
    border-right: 1px rgb(201, 227, 255) solid;
    height: calc(100vh - 100px);
    margin-top: 100px;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 50px 0;
}

.item {
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    color: #FFFFFF;
    height: 60px;
    cursor: pointer;
    user-select: none;
}

.active {
    background: rgb(201, 227, 255);
    color: #0177fb;
}

@media screen and (max-width: 800px) {
    .nav {
        height: fit-content;
        width: 100%;
        border: none;
        margin-top: 0;
    }

    .items {
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        padding: 0;
        padding-top: 80px;
        gap: 0px;
    }

    .item {
        font-size: 14px;
        gap: 6px;
        padding: 0 10px;
        border-radius: 20px;
        height: 40px;
    }
}
</style>
