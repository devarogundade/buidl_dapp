<template>
<div class="box" v-if="show && data">
    <h3><i class="fi fi-br-check"></i> {{ data.title }}</h3>
    <p>{{ data.message }}</p>
    <div class="action" v-on:click="close()">Close</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            data: null
        }
    },
    created() {
        $nuxt.$on('success', (data) => {
            this.show = true
            this.data = data
        })
    },
    methods: {
        close: function () {
            this.show = false
            this.data = null
        }
    }
}
</script>

<style scoped>
.box {
    width: 500px;
    padding: 40px;
    border-radius: 30px;
    background: rgb(222, 255, 222);
    position: fixed;
    left: calc(50% + 150px);
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 8px #ccc;
    z-index: 10;
}

.box h3 {
    color: green;
    font-size: 24px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.box p {
    font-size: 18px;
    line-height: 24px;
}

.action {
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    border-radius: 10px;
    border: 1px #000 solid;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
}
</style>
