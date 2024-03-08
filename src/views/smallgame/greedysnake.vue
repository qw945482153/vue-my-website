<template>
    <div class="greedysnake">
        <canvas id="canvas" width="500" height="500" >
            
        </canvas>
        <div style="position: absolute;top: 50%;z-index: 99;transform: translateY(-50%)" v-if="!isStart" >
            <div style="width: 500px;text-align: center;">历史分数:0</div>
            <div style="width: 100%;text-align: center;margin-top: 20px;font-size: 28px;">贪吃蛇</div>
            <div style=" width: 100px;padding: 10px 0;border: 1px solid #fff;border-radius: 15px; margin-top: 20px;text-align: center;margin-left: 50%;transform: translateX(-50%);cursor: pointer;" @click="startGame">开始游戏</div>
        </div>
    </div>
</template>
<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';


let ctx = ref('');
//贪吃蛇属性
let snakelength = ref(4) //贪吃蛇默认长度
let snakeBg = ref('#000') //贪吃蛇颜色
let foodsBg = ref('red') //食物颜色
let snakeSize = 25; //贪吃蛇大小
let snake = [{x:0,y:250},{x:25,y:250},{x:50,y:250},{x:75,y:250}]
let  bgWidth = 500;
let  bgHeight = 500;
let foods = [25,25];
let moveF = 'ArrowRight';
let isStart = ref(false);
let speedList={
    x:25,
    y:0
}
let timer = null;
onMounted(()=>{
    nextTick(()=>{
        let cont = document.getElementById('canvas');
        ctx.value =cont.getContext('2d');
        init();
        
        })
    
})
onUnmounted(() => {
    document.body.removeEventListener('keydown',snakeMove);
    clearInterval(timer);
    timer=null;
    isStart.value = false;
})
function init(){
    ctx.value.clearRect(0,0,500,500);
    drawSnake();
    foods[0]=randFood().x*25;
    foods[1]=randFood().y*25;
    drawFood();
}
function replaceganme(){
    ctx.value.clearRect(0,0,500,500);
    snake = [{x:0,y:250},{x:25,y:250},{x:50,y:250},{x:75,y:250}];
    foods[0]=randFood().x*25;
    foods[1]=randFood().y*25;
    drawFood();
    drawSnake();
    clearInterval(timer);
    timer = null;
    
}
function randFood(){
    let x = Math.floor(Math.random()*20);
    let y = Math.floor(Math.random()*20);
    for(let i=0;i<snake.length;i++){
        if(x*25==snake[i].x && y*25!== snake[i].y){
            return randFood();
        }
    }
    return {x,y};
}
function drawSnake(){
    for(let i=0; i<snake.length;i++){
        // ctx.value.rect(50 + i*50,250,50,50)
        // ctx.value.fillstyle='pink'
        // ctx.value.fill()
        ctx.value.strokeStyle = snakeBg.value;
        ctx.value.lineWidth = 1    //设置矩形边框宽度
        ctx.value.strokeRect(snake[i].x,snake[i].y,25,25)
        // ctx.value.fillRect(0 + i*50, 250, 50, 50);
    }
}
function drawFood(){
     ctx.value.fillStyle = "#0da9fd";
     ctx.value.fillRect(foods[0],foods[1],25,25);
}
function snakeMove(e){
    if(e.code == 'ArrowUp' && moveF != 'ArrowDown'){
        moveF = 'ArrowUp';
        speedList.x=0;
        speedList.y=-25;
        determine();
    }else if(e.code == 'ArrowDown'&& moveF != 'ArrowUp'){
        moveF = 'ArrowDown';
        speedList.x=0;
        speedList.y=25;
        determine();
    }else if( e.code == 'ArrowLeft' && moveF != 'ArrowRight'){
        moveF = 'ArrowLeft';
        speedList.x=-25;
        speedList.y=0;
        determine();
    }else if( e.code == 'ArrowRight' && moveF != 'ArrowLeft'){
        moveF = 'ArrowRight';
        speedList.x=25;
        speedList.y=0;
        determine();
    }
    
}
function determine(){
    let b = {
       x:snake[snake.length-1].x + speedList.x,
       y:snake[snake.length-1].y + speedList.y
    }
    let isDeath = dealDeath(b);
    if(isDeath){
        replaceganme();
        isStart.value = false;
        clearInterval(timer);
        timer = null;
        return alert("游戏结束!!!");
    } 
    if( b.x==foods[0] && b.y == foods[1]){
        snake.push(b);
        init();
    }else{
        snake.shift();
        snake.push(b);
        ctx.value.clearRect(0,0,500,500);
        drawSnake();
        drawFood();
    }
    
}
function dealDeath(b){
    console.log(b);
    if(b.x>=500 || b.x<=0 || b.y>=500 || b.y<=0){
        return true;
    }
    for(let i = 0; i < snake.length; i++){
        if(snake[i].x == b.x && snake[i].y == b.y){
            return true;
        }
    }
    return false;
}
function startGame(){
    let cont = document.getElementById('canvas');
    document.body.addEventListener('keydown',snakeMove)
    isStart.value = true;
    timer = setInterval(()=>{
         determine()
    },1000)
}
</script>
<style lang="scss">
.greedysnake{
    width: 500px;
    height: 500px;
    position: relative;
}
</style>