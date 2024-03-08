<template>
    <div :class="[classNames.animate,classNames.active]">
        <span v-for="(item,index) in state.dom" :key="index" :class="item.active ? classNames.active : ''"></span>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
let boxnum = ref(16);
let props = defineProps({
    type:{
        type:String,
        defalut:'enter'
    }
})
let list = ref([]);
let dom = ref([]);
let setAnimate = ref("");
let setCallback = ref("");
let emit = defineEmits(['tagchange'])
const classNames = {
    animate: `animate-${props.type}`, // type决定进入还是离开的样式
    active:`active-${props.type}`
}
for(let i = 0; i < boxnum.value; i++){
    list.value.push({active:false});
}
let state = ref({
    active:true,
    dom:list.value //16个矩形
})
onMounted(()=>{
    let order = shuffle(16) //组件加载后 创建1-16的乱序数组
    let newDom = state.value.dom;
    let i = -1;
    let aniTimeout = () => {
        i++;
        if(i >= order.length){return}
        newDom[order[i]].active = true;
        dom.value = newDom;
    }
    setAnimate.value = setInterval(aniTimeout,17)
    setCallback.value = setTimeout(() => {
        emit('tagchange',false)
    },1000)
})
onUnmounted(()=>{
    clearInterval(setAnimate.value)
    clearTimeout(setCallback.value)
})
function shuffle(n){
    // 生成m张牌
    let arr = new Array(n);
    for(let i = 0; i < n; i++){
        arr[i] = i;
    }
    // 每次抽出一张牌，放在另一堆。因为要在数组离抽出元素，把后面的所有元素向前拉一位，所以很费时
    var newArr = [];
    // console.log(arr);
    for(let i=n;i>0;i--){
        let length = Math.floor(Math.random()*i);
        newArr.push(arr[length]);
        arr.splice(length,1);
    }
    return newArr;
}
</script>
<style lang="scss">
$color_main:#ffd03f;
@mixin SwitchSpanInit {
  display: block;
  width: 100%;
  height: calc(100% / 16) ;
  background-color: $color_main;  
  transition: 0.6s ease-in; 
}
@mixin SwitchDivInit {
  width: 100%;
  height: calc(100% - 37px);
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0; 
}
.animate-leave{
  @include SwitchDivInit();
  span{
    @include SwitchSpanInit();
    transform: scale(0,1.05);
    transform-origin: left top;  
  }
  span.active-leave{
    transform: scale(1,1.05);
  }
}
.animate-enter{
  @include SwitchDivInit();
  span{
    @include SwitchSpanInit();
    transform: scale(1,1.05);
    transform-origin: right top;  
  }
  span.active-enter{
    transform: scale(0,1.05);
  }
}
</style>