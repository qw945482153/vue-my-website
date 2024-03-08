<template>
    <div class='setting'>
        <p>background</p>
        <div class='colors'>
            <span v-for="(item, index) in state.colors" :key="index" :class="[item.isChoose?`${item.value}${colorChoose()}`:item.value]"  @click="bgChoose(index)"></span>
        </div>
        <p style='margin-top:1.8rem;'>choose filter</p>
        <Fileter  />
    </div>
</template>
<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import Fileter from '../Fileter/Fileter.vue';
let lists = ref([
{value:'none',fn:()=>{listFn('','none')}},
  {value:'hue rotate',fn:()=>{listFn('hue-rotate','hue rotate')}},
  {value:'negative',fn:()=>{listFn('negative','negative')}},
  {value:'black and white',fn:()=>{listFn('black-white','black and white')}}
])
let state = ref({
    colors: [{
        value: 'main-bg',
        isChoose: false
    },
    {
        value: 'green-bg',
        isChoose: false
    },
    {
        value: 'red-bg',
        isChoose: false
    },
    {
        value: 'black-bg',
        isChoose: false
    },
    {
        value: 'colour-bg',
        isChoose: false
    },
    {
        value: 'grid-bg',
        isChoose: false
    }],
    color: ''
})
function bgChoose(index) {
    const _index = index;
    colorChoose(_index);
    const color = document.querySelector('#app .main');
    color.className = `main ${state.value.colors[_index].value}`
}
function colorChoose(index) {
    let newColors = state.value.colors.filter((c, i) => {
        c.isChoose = i === index;
        return c;
    })
    state.value.colors = newColors;
}
onMounted(() => {
    let hasClass = void 0;
    // const color = document.getElementById('app').className;
    const color = document.querySelector('#app .main').className;
    const newColors = state.value.colors.map(i => {
        if (i.value == color) i.isChoose = true, hasClass = 1;
        return i
    })
    if (!hasClass) newColors[0].isChoose = true;
    state.value.color = newColors;
})
const redux = () => {
    return document.body.getAttribute('fileter');
}
</script>
<style lang="scss">
$main_bg:#4456a7;
$green_bg:#44a75e;
$red_bg:#a74444;
$black_bg:#474747;
.setting {
    padding: 1.6rem;

    p {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
}

.colors {
    width: 100%;
    display: flex;

    &::after {
        content: '';
        display: block;
        clear: both;
    }

    &:hover>span {
        opacity: .4;
    }

    span {
        position: relative;
        display: block;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        float: left;
        margin-right: 12px;
        z-index: 2;
        cursor: pointer;
        transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);

        &.colorChoose::before {
            content: '';
            display: block;
            position: absolute;
            z-index: -1;
            top: -2px;
            left: -2px;
            border: 2px solid #fff;
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }

        &:hover {
            opacity: 1;
            transform: scale(1.1)
        }
    }
}

@media screen and (max-width: 480px) {
    .setting {
        width: calc(96vw - 3.2rem);
    }
}

.main-bg{
  background-color: $main_bg !important;
}
.green-bg{
  background-color: $green_bg !important;
}
.red-bg{
  background-color: $red_bg !important;
}
.black-bg{
  background-color: $black_bg !important;
}
.colour-bg{
  background:linear-gradient(45deg, #e10522 0%, rgba(225, 5, 34, 0) 70%), linear-gradient(135deg, #3105d1 10%, rgba(49, 5, 209, 0) 80%), linear-gradient(225deg, #0adbd8 10%, rgba(10, 219, 216, 0) 80%), linear-gradient(315deg, #09f505 100%, rgba(9, 245, 5, 0) 70%)
}
.grid-bg{
  background: url('../../assets/img/main-bg.png');
}
</style>