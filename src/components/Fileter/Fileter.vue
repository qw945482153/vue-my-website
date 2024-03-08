<template>
    <div :class='`select-style-${ownstyle}`'>
          <div v-if="isMobile()" @touchstart='ShowList($event)' class="select-curr">{{curr}}</div>
          <div v-else @click='ShowList($event)' class="select-curr">{{curr}}</div>
       <!-- <Selects v-if="state.showlist"  @choose='choose'/> -->
             <ul v-if="state.showlist">
                <li v-for="(item, index) in lists" :key='index' @touchstart.stop="touchstarts(index)" @click.stop='touchstarts(index)'>{{ item.value }}</li>
            </ul>
      </div>
</template>
<script setup>

import { isMobile } from '../../util/isMobile';

import { ref , onMounted, onUnmounted} from 'vue'
const eventlistener = isMobile() ? 'touchstart' : 'click'
let bod = document.body;
let props = defineProps({
    redux:{
        type:Function,
        default:''
    }
})
let lists = ref([
{value:'none',fn:()=>{listFn('','none')}},
  {value:'hue rotate',fn:()=>{listFn('hue-rotate','hue rotate')}},
  {value:'negative',fn:()=>{listFn('negative','negative')}},
  {value:'black and white',fn:()=>{listFn('black-white','black and white')}}
])
let curr = ref(lists.value[0].value)
let state = ref({
    curr: lists.value[0].value,
    showlist:false
})
const redux = ()=> {
  return bod.getAttribute('fileter')
}
const listFn = (c, n)=>{
  bod.className= c ; 
  bod.setAttribute('fileter',n)
}
function close(e) {
    if(state.value.showlist) return;
    state.value.showlist = false;
    console.log(1);
    e.stopPropagation();
}
function choose(index){
    state.value.curr = index.value;
    state.value.showlist = false;
}
function ShowList(e){
    console.log(e)
    state.value.showlist = !state.value.showlist;
    console.log(state.value.showlist)
    e.stopPropagation();
}
onMounted(() => {
    window.addEventListener(eventlistener,close);
})
onUnmounted(() => {
    window.removeEventListener(eventlistener,close)
})
const ownstyle = props.style || 'ext'
function touchstarts(e){
    lists.value[e].fn();
    state.value.showlist = false;
    curr.value = lists.value[e].value
    console.log(curr.value)
}
</script>
<style lang="scss">
ul li{
  list-style: none;
  margin: 0;
  padding: 0;
}
$color_main:#ffd03f;
// 下拉选框
div[class*='select-style-']{
  width: 210px;
  line-height: 34px;
  height: 34px;
  font-size: 1.2rem;
  position: relative;
  white-space:nowrap; 
  .select-curr,ul{
    box-sizing: border-box;
    position: absolute;

    left: 0;
    top: 0;

  }
  .select-curr{
    width: 100%;
    z-index: 2;
    height: 34px;
    border-radius: 17px;
    text-indent: 17px;
    cursor: pointer;
  }
  ul{
    z-index: 3;
    // transform: scale(1,.4);
    transform-origin: top;
    animation: select .1s ease-out forwards;
    li:hover{
      color:$color_main
    }
    li{
      padding: 0 18px;
      cursor: pointer;
    }
  }
}
// 默认样式
.select-style-ext{
  .select-curr{
    background-color: #222222;
    color: #fff;
    &::after{
      content: '';
      display: block;
      position: absolute;
      right: 10px;
      top: 14px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid white;
    }
  }
  ul{
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #111111;
  }
}
</style>