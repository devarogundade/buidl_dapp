<template>
<div :class="`container ${state}`">
    <div class="box" id="box">
        <div class="title">
            <p>Draw board</p>
            <i v-on:click="$nuxt.$emit('discard-draw-board')" class="fa-solid fa-xmark"></i>
        </div>
        <canvas id="canvas">
            Sorry, your browser does not support HTML5 canvas API.
        </canvas>
    </div>
</div>
</template>

<script>
export default {
    props: ['state'],
    mounted() {
        var canvas = document.getElementById("canvas");
        var box = document.getElementById("box");
        var ctx = canvas.getContext("2d");

        // Fill Window Width and Height
        canvas.width = (box.offsetWidth - 60);
        canvas.height = (box.offsetHeight - 100);

        // Set Background Color
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Mouse Event Handlers
        if (canvas) {
            var isDown = false;
            var canvasX, canvasY;
            ctx.lineWidth = 5;

            canvas.addEventListener('mousedown', (e) => {
                isDown = true;
                ctx.beginPath();
                canvasX = e.pageX - canvas.offsetLeft;
                canvasY = e.pageY - canvas.offsetTop;
                ctx.moveTo(canvasX, canvasY);
            })

            canvas.addEventListener('mousemove', (e) => {
                if (isDown !== false) {
                    canvasX = e.pageX - canvas.offsetLeft;
                    canvasY = e.pageY - canvas.offsetTop;
                    ctx.lineTo(canvasX, canvasY);
                    ctx.strokeStyle = "#000";
                    ctx.stroke();
                }
            })

            canvas.addEventListener('mouseup', (e) => {
                isDown = false;
                ctx.closePath();
            })
        }

        // Touch Events Handlers
        const draw = {
            started: false,
            start: function (evt) {

                ctx.beginPath();
                ctx.moveTo(
                    evt.touches[0].pageX,
                    evt.touches[0].pageY
                );

                this.started = true;

            },
            move: function (evt) {

                if (this.started) {
                    ctx.lineTo(
                        evt.touches[0].pageX,
                        evt.touches[0].pageY
                    );

                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 5;
                    ctx.stroke();
                }

            },
            end: function (evt) {
                this.started = false;
            }
        };

        // Touch Events
        canvas.addEventListener('touchstart', draw.start, false);
        canvas.addEventListener('touchend', draw.end, false);
        canvas.addEventListener('touchmove', draw.move, false);

        // Disable Page Move
        document.body.addEventListener('touchmove', function (evt) {
            evt.preventDefault();
        }, false);
    }
}
</script>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(20px);
    height: 100%;
    width: 100%;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.hide {
    top: 100vh !important;
    transform: scale(0.5, 0.5);
}

.box {
    border-radius: 30px;
    max-width: 90%;
    width: 800px;
    height: 600px;
    background: #23242F;
    border-radius: 24px;
    padding: 30px;
}

.title {
    color: #FFFFFF;
    display: flex;
    column-gap: 10px;
    font-weight: 600;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;
    margin-right: -10px;
    margin-top: -10px;
    margin-bottom: 20px;
}

.title i {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.title i:hover {
    color: #FF6370;
}

#canvas {
  cursor: grabbing;
}
</style>
