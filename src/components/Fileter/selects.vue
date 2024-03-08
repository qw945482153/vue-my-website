<template>
    <div class="" >
        
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { isMobile } from '../../util/isMobile';
let lists = ref([
    { value: 'none', fn: () => { listFn('', 'none') } },
    { value: 'hue rotate', fn: () => { listFn('hue-rotate', 'hue rotate') } },
    { value: 'negative', fn: () => { listFn('negative', 'negative') } },
    { value: 'black and white', fn: () => { listFn('black-white', 'black and white') } }
])
</script>
<style lang="scss">
.select-box {
    width: 210px;
    line-height: 34px;
    height: 34px;
    font-size: 1.2rem;
    position: relative;
    white-space: nowrap;
}

ul {
    box-sizing: border-box;
    position: absolute;

    left: 0;
    top: 0;

}

.select-curr {
    width: 100%;
    z-index: 2;
    height: 34px;
    border-radius: 17px;
    text-indent: 17px;
    cursor: pointer;
}

ul {
    z-index: 3;
    transform: scale(1, .4);
    transform-origin: top;
    animation: select .1s ease-out forwards;

    li:hover {
        color: $color_main
    }

    li {
        padding: 0 18px;
        cursor: pointer;
    }
}

ul {
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #111111;
}</style>