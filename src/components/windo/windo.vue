<template>
<div ref="pops" 
        :class="myClass">
        <p v-if="props.noClose">{{props.title}}</p> 
        <p  v-else
          @mousedown="handleDown"
          @mouseup="handleUp"
          :style="{cursor:props.unmove?'auto':''}"
          ><a @click="close" title="关闭"></a>{{props.title}}</p>
          <slot ></slot>
         
      </div>
</template>
<script setup>

import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
let isMove = ref(false);
let emit = defineEmits();
let pops = ref()
let props = defineProps({
    unmove:{
        type:Boolean,
        default:false
    },
    title:{
        type:String,
        default:"123"
    },
    noClose:{
        type:Boolean,
        default:false
    },
    classz:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:""
    }
})
let myClass = computed(() => {
  return props.noClose ? `figure-pop-about figure-style-${props.type} ${props.classz}`: `figure-pop figure-style-${props.type} ${props.classz}`
})
let positions = ref({
    left:0,
    top:0,
    constx:0,
    consty:0,
    w:0,
    h:0
})
const handleMove = (event) => {
    // nextTick(()=>{
        if( !isMove.value) return;
            positions.value.left = event.clientX - positions.value.constx + positions.value.w/2
            positions.value.top = event.clientY - positions.value.consty + positions.value.h/2
            pops.value.style.left = ~~positions.value.left + 'px'
            pops.value.style.top = ~~positions.value.top + 'px'
    // })
}
let Move = handleMove;
onMounted(() => {
    !props.unmove && window.addEventListener("mousemove",Move);
})
onUnmounted(() => {
    window.removeEventListener("mousemove",Move)
})
const handleDown = (event) => {
    if(props.unmove) return;
    nextTick(() => {
        let pop = pops.value.getBoundingClientRect();
        positions.value.w = pop.width;
        positions.value.h = pop.height;
        positions.value.constx = event.clientX - pop.left;
        positions.value.consty = event.clientY - pop.top;
        isMove.value = true;
    })
}
const handleUp = () => {
    isMove.value = false;
}
const close = () => {
  emit('onclose','');
}

</script>
<style lang="scss">
$color_main:#ffd03f;
$b_border:1px solid #111111;
$color_wathet:#2fd2db;
$color_pink:#ff98c6;
$color_violet:#817ef8;

$main_bg:#4456a7;
$green_bg:#44a75e;
$red_bg:#a74444;
$black_bg:#474747;
*{
  padding: 0;
  margin: 0;
}
$radius:0.8rem;
@mixin after ($both) {
  content: '';
  display: block;
  @if $both == both{
    clear: both;
  }
}
.figure-pop-about{
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  &>p{
    background-color: #fff;
    line-height: 40px;
    border-bottom: $b_border;
    text-align: center;
    position: relative;
    font-size: 16px;
    border-radius: $radius $radius 0  0 ;    
    padding: 0;
    margin: 0;
  }
}
.figure-pop{
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  box-sizing: border-box;
  &>p{
    background-color: #fff;
    line-height: 40px;
    border-bottom: $b_border;
    text-align: center;
    position: relative;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    cursor: move;
    border-radius: $radius $radius 0  0 ;
    &>a{
      display: block;
      position: absolute;
      top: 8px;
      left: 12px;
      width: 25px;
      height: 25px;
      background-color: #f95f56;
      border-radius: 50%;
      transform: rotate(45deg);
      &::before,&::after{
        @include after(t);
        position: absolute;
        background-color: #fff
      }
      &::before{
        width: 17px;
        height: 1px;
        left: 4px;
        top: 12px;
      }
      &::after{
        width: 1px;
        height: 17px;
        left: 12px;
        top: 4px;
      }
    }
  }
}
/*pop style*/
div[class*='figure-style-']{
  border-radius: $radius;
  border: $b_border;
}
.figure-style-wathet{
  background-color: $color_wathet
}
.figure-style-pink{
  background-color: $color_pink
}
.figure-style-violet{
  background-color: $color_violet
}
.figure-style-white{
  background-color: #fff;
  &>p{
    background-color: #d8dce3;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.figure-style-main{
  background-color: $color_main
}
.figure-style-permission {
  background-color: #333;
}
.figure-style-light{
  background-color: #fffbf3
}
.figure-style-setting{
  background-color: #e2e2e2
}
.figure-style-none{
  top: 0;
  left: 0;
}
</style>