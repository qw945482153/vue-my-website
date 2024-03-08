<template>
    <div class="">
        
            <div class="text">
                <span :class="[state.span1 ? 'animate' : '']">{{ancientPoetry.one}}</span><br />
                <span :class="[state.span2 ? 'animate' : '']">{{ancientPoetry.two}}</span><br />
                <span :class="[state.span3 ? 'animate' : '']">(~￣▽￣)~[]<strong>{{ancientPoetry.auth}}</strong><i
                        :class="[state.cursor ? 'cursor' : '']"></i></span>
            </div>

    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getpoetry } from '../../util/api/api';
let state = ref({
    span1: false,
    span2: false,
    span3: false,
    cursor: false
})
let timeer0 = ref(null);
let timeer1 = ref(null);
let timeer2 = ref(null);
let timeer3 = ref(null);
let num = ref(Math.floor(Math.random()*(6-1)))
let timer = null;
let ancientPoetry = ref(
    {
        one: '',
        two: '',
        auth: '',
        expression:''
    } )

onMounted(() => {
    getpoetrys();
    timer = setInterval(() => {
        getpoetrys();
    }, 5000);
    
    
})
onUnmounted(() => {
    clearInterval(timer);
    clearTimeout(timeer0.value);
    clearTimeout(timeer1.value);
    clearTimeout(timeer2.value);
    clearTimeout(timeer3.value);
})
function getpoetrys(){
    getpoetry().then(res => {
        ancientPoetry.value.auth = res.res.auth;
        ancientPoetry.value.one = res.res.one;
        ancientPoetry.value.two = res.res.two;
        ancientPoetry.value.expression = res.res.expression;
        state.value.span1 = false;
        state.value.span2 = false;
        state.value.span3 = false;
        state.value.cursor = false;
        timeer0.value = setTimeout(() => {
        state.value.span1 = true;
        }, 1200);
        timeer1.value = setTimeout(() => {
            state.value.span2 = true;
        }, 1400);
        timeer2.value = setTimeout(() => {
            state.value.span3 = true;
        }, 1600);
        timeer0.value = setTimeout(() => {
            state.value.cursor = true;
        }, 2400);

    })
}
</script>
<style lang="scss">
$whilte0:rgba(255,255,255,0);
$whilte1:rgba(255,255,255,1);
$color_main:#ffd03f;
.text {
    font-size: 106px;
    color: #ffff;
    line-height: 1.2;
    padding-top: 54px;

    span {
        position: relative;
        z-index: 1;
        color: $whilte0;

        strong {
            font-size: .5em;
            padding-left: 1rem;
        }

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 90%;
            transform: scaleX(0);
            transform-origin: left;
            top: 6%;
            left: 0;
            z-index: 2;
            background: $color_main
        }

        i {
            width: 2px;
            background: $whilte0;
            height: 80%;
            position: absolute;
            right: -4px;
            top: 15%;

            &.cursor {
                animation: cursoring 1s steps(1) infinite;
            }
        }
    }
}

.animate {
    animation: textAnimate 0.8s ease-in-out forwards;

    &::before {
        animation: bgAnimate 0.8s ease-in-out forwards;
    }
}

@keyframes cursoring {
    0% {
        background: $whilte1;
    }

    50% {
        background: $whilte0;
    }

    100% {
        background: $whilte1;
    }
}


@keyframes textAnimate {
    0% {
        color: $whilte0
    }

    40% {
        color: $whilte0
    }

    60% {
        color: $whilte1
    }

    100% {
        color: $whilte1
    }
}

@keyframes bgAnimate {
    0% {
        transform: scaleX(0);
        transform-origin: left;
    }

    40% {
        transform: scaleX(1);
        transform-origin: left;
    }

    60% {
        transform: scaleX(1);
        transform-origin: right;
    }

    100% {
        transform: scaleX(0);
        transform-origin: right;
    }
}

@media screen and (max-width: 1440px) {
    .text {
        font-size: 96px
    }
}

@media screen and (max-width: 960px) {
    .text {
        font-size: 80px
    }
}

@media screen and (max-width: 768px) {
    .text {
        font-size: 60px
    }
}

@media screen and (max-width: 480px) {
    .text {
        font-size: 42px;
        padding-top: 19rem;
    }
}

@media screen and (max-width: 360px) {
    .text {
        font-size: 32px;
        padding-top: 16rem;
    }
}</style>