<template>
<div class="container">
    <div class="explain">
        <h3>Notifications</h3>
        <p>You don't have notifications at the moment.</p>
    </div>
</div>
</template>

<style scoped>
.container {
    padding-top: 120px;
    padding-bottom: 50px;
    min-height: 100vh;
    position: relative;
    width: 100%;
}

.explain {
    border-radius: 30px;
    max-width: 90%;
    width: 400px;
    background: #23242F;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 24px;
    color: #FFFFFF;
    padding: 30px;
    position: absolute;
}

.explain h3 {
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
}

.explain p {
    margin-top: 20px;
    font-size: 18px;
    line-height: 24px;
}
</style>
