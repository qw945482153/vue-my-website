<template>
    <li class="">
        
    </li>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
let state = ref({
    bubbles:[],
    sup:0,
    time:''
})
let upNum = ref(0);
let upSupTimeout = null;
let time = new Date(state.value.time);
let now = new Date().getTime() - time.getTime();
let data = now > 24*60*1000 ? time.getFullYear() + '-' + (+time.getMonth() + 1) + '-' + time.getDate() 
  : ( (now > 60 * 60 * 1000) ?~~(now / 3600000)+'小时前' : ~~(now / 60000) + '分钟前') // 如果是一天之前的，则显示日期，否则显示几分钟前
onUnmounted(() => {
    clearTimeout(upSupTimeout);
})
function upSup(){
    let newBub = state.value.bubbles;
    newBub.push({
        time: new Date().getTime() // 添加新的泡泡动画元素
    })
    state.value.sup = state.value.sup +1;
    state.value.bubbles = newBub;
    upNum.value ++;
    clearTimeout(upSupTimeout);
    upSupTimeout = setTimeout(()=>{
        upAxios()
    },1000)
}
//点赞
function upAxios(){
    
}
function outBubble(bub){
    const newBub = state.value.bubbles;
    const index = newBub.indexOf(bub);
    newBub.splice(index,1);
    state.value.bubbles = newBub;
}
</script>
<style lang="scss">
</style>