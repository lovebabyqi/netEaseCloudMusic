<template>
    <div class='loading'>
        <div class="loading_box">
            <span class='load1 item'/>
            <span class='load2 item'/>
            <span class='load3 item'/>
            <span class='load4 item'/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped lang="less">
    @keyframes loading_rotate {
        from {
            transform: translateX(-50%) rotate(0deg);
        }
        to {
            transform: translateX(-50%) rotate(360deg);
        }
    }

    .loading {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(255, 255, 255, .2);
        z-index: 100;

        .loading_box {
            width: 30px;
            height: 30px;
            position: absolute;
            left: 50%;
            top: 30%;
            animation: loading_rotate .9s linear infinite;

            .item {
                position: absolute;
                width: 10px;
                height: 10px;
                display: inline-block;
                border-radius: 50%;
            }

            .load1 {
                top: 0;
                left: 0;
                background-color: rgba(24, 144, 255, .9);
            }

            .load2 {
                top: 0;
                right: 0;
                background-color: rgba(24, 144, 255, .7);
            }

            .load3 {
                bottom: 0;
                left: 0;
                background-color: rgba(24, 144, 255, .5);
            }

            .load4 {
                bottom: 0;
                right: 0;
                background-color: rgba(24, 144, 255, .3);
            }
        }
    }
</style>