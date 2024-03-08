<template>
    <div >
        <div class="supBox">
        <div class="addSupNum">
            <h1 style="margin: 0;padding: 0;">THANK U!</h1>
            <div :class="myclass">
                {{state.num}}
            </div>
        </div>
        <div ref="imgs">
            <!-- {this.src.map((src,i) => <img key={i} src={src} /> )} -->
            <img v-for="(item,index) in src" :key="index" :src="item"  />
        </div>
    </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { getGoodNum,addGoodNum } from '../../util/api/api'
import { parrotUrl } from '../../components/imgurls';
const imgs = ref();
let props =  defineProps({
    num:{
        type:Number,
        default:0
    }
})
let emit = defineEmits();
var PARROTS = 25, //半径
    DIAMETER = 30,
    ROTATION = 0.1,
    SPEED = 0.3,
    SPACING = 4,
    OFFSET = 20
let parrotsSrcs = [];
for(let i = 0; i - PARROTS; i++){
  parrotsSrcs.push(parrotUrl[~~(Math.random()*18)]) // gif图序列
}

let state = ref({
    num:props.num,
    bright:false,
})
let src = ref(parrotsSrcs);
let parrots = ref([]);
let SIZE = ref(30);
let roundOut = ref(null);
let closeOut = ref(null);
let a = ref(Math.round(SIZE.value*DIAMETER*0.208333)) // 无限循环
let current = ref(OFFSET)
let mouse = ref({
    x: a.value + OFFSET,
    y: a.value + OFFSET
})
let imgLoad = ref(0);
let windowSize = ref({
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight
})
let timer = ref(null);
let retruns = ref(false)
onMounted(() => {
    // getCountnum();
    timer.value = setTimeout(() => {
        addGoodNum().then(res => {
            state.value.num = Number(state.value.num) + 1;
            state.value.bright = true;
        })
        
    },1200)
    for( let i = 0; i < PARROTS; i++){
        parrots.value[i] = { x:0,y:0,X:0,Y:0};
    }
    emit('upSub');
    draw();
    mouse.value = {
      x: windowSize.value.w / 2,
      y: windowSize.value.h / 2
    }
    roundOut.value = setTimeout(()=>{
      mouse.value={
        x: windowSize.value.w + 600,
        y:0
      };
    },3000)
    closeOut.value = setTimeout(()=>{
    //   draw = null;
    //   makeCircle = null;
      retruns.value = true;
      cancelAnimationFrame(draw)
      emit('close',0);
    },4600)
})
onUnmounted(() => {
    clearTimeout(timer.value);
    cancelAnimationFrame(draw)
    clearTimeout(roundOut.value)
    clearTimeout(closeOut.value)
    // draw = makeCircle = null;
    retruns.value = true
})
const myclass= computed(()=>{
    return state.bright ? 'numSpan bright' : 'numSpan'
})
const getCountnum = () => {
    getGoodNum().then(res =>{
        state.value.num = res.goods_num;
    })
}
getCountnum();
 const draw = () => {
    if(retruns.value) return
    let parrot = parrots.value[0];
    let prevParrot = parrots.value[0];
    parrot.x = parrot.X += (mouse.value.x - parrot.X) * SPEED;
    parrot.y = parrot.Y += (mouse.value.y - parrot.Y) * SPEED;

    for (let _i2 = PARROTS - 1; _i2 > 0; --_i2) {
      parrot = parrots.value[_i2];
      prevParrot = parrots.value[_i2 - 1];
      parrot.x = parrot.X += (prevParrot.x - parrot.X) * SPEED;
      parrot.y = parrot.Y += (prevParrot.y - parrot.Y) * SPEED;
    }
    makeCircle(imgs.value);
    window.requestAnimationFrame(draw);
    //requestAnimationFrame(draw());
    // setTimeout(() => {
    //     draw();
    // }, 1000);
}
const makeCircle = (dom) => {
    if(retruns.value) return
    var parrot = void 0;
    current.value -= ROTATION;
    for (let _i = PARROTS - 1; _i > -1; --_i) {
        parrot = parrots.value[_i];
        imgs.value.children[_i].style.transform = "translate("+
        Math.round(parrot.x + a.value * Math.cos((current.value + _i) / SPACING) - 15) + 'px,'+
        Math.round(parrot.y + a.value * Math.sin((current.value + _i) / SPACING) - 15) + 'px)'
    }
  }


</script>
<style lang="scss">
    $color_bright: #443230;
// 点赞
.supBox{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  img{
    width: 35px;
    height: 35px;
    position: absolute;
    left: 0;
    top: 0;
    display: block;
  }
}
.addSupNum{
    position:  absolute;
    top: 50%;
    left:  50%;
    width: 500px;
    height: 150px;
    background-color: #ff6d8e;
    transform: translate(-50%,-50%);
    border: 4px solid #ffffff;
    h1{
        line-height: 100px;
        font-size: 36px;
        font-weight:  bold;
        color: #ffffff;
        text-align:  center;
    }
    .numSpan{
        text-align: center;
        font-weight: bold;
        color: #fff;
        font-size: 1.4rem;
        letter-spacing:6px
    }
    .bright{
        animation: bright  1s steps(1) forwards;
    }
}

@keyframes bright{
    0%{
        color:#fff
    }
    17%{
        color:$color_bright
    }
    34%{
        color:#fff
    }
    50%{
        color:$color_bright
    }
    67%{
        color:#fff
    }
    84%{
        color:$color_bright
    }
    100%{
        color:#fff
    }
}

</style>