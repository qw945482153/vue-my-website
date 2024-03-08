<template>
    
        <div ref='canvas' class='canvas'></div>
        <transition  v-if="showPermissionModal"
          key='test'
          name="figure">
          <Pop @close="closepop" type='permission' title="用户授权" >
            <template #default>
                <div class='permissionModalContent'>
              <button
                class='permissionModalContentBtn'
                @click="getDevicePermission">点击授权重力感应</button>
            </div>
            </template>
          </Pop>
        </transition >

</template>
<script setup>
import Pop from '../../components/windo/windo.vue';
import { ref,onMounted, nextTick } from 'vue';
import Matter from 'matter-js'
import { aboutImg } from '../../components/imgurls';
import { isMobile } from '../../util/isMobile.js';
let showPermissionModal = ref(false);
let borders = [];
let  bg = [];
let Ew = "";
let Eh = "";
let balls = "";
let mouseConstraint = "";
let  _render = {};
let  canvas = ref()
// aboutMe 城市组件
const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Common = Matter.Common,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;
let engine = Engine.create();
const emojis = [ aboutImg.emjs, aboutImg.emja, aboutImg.emjd, aboutImg.emjh, aboutImg.emjz]; //表情图片

// 球体配置
const density = isMobile() ? 0.6 : 0.9;
const restiution = isMobile() ? 0.6 : 0.4;
const ballopts = (size) => ({
    density: density, // 密度
    restiution: restiution, // 弹性
    render: {
        fillStyle: 'none',
        sprite: {
            texture: emojis[~~(Math.random()*5)],
            xScale: (size / 40).toFixed(2),
            yScale: (size / 40).toFixed(2)
        }
    },
    friction: 1
}) 
 // 自适应屏幕
 const Resize = function _ReSize() {
    const b = borders
    // console.log("执行了")
    // console.log(borders);
    // console.log(canvas.value.offsetHeight,canvas.value.offsetHeight)
    const x = canvas.value.offsetWidth
    const y = canvas.value.offsetHeight
    const _x = b[0].vertices[1].x - b[0].vertices[0].x
    const _y = b[1].vertices[2].y - b[1].vertices[1].y
    _render.canvas.width = x
    _render.canvas.height = y
    Body.scale(b[0], x / _x, 1)
    Body.scale(b[2], x / _x, 1)
    Body.scale(b[1], 1, y / _y)
    Body.scale(b[3], 1, y / _y)
    Body.setPosition(b[0], { x: _x / 2, y: -4 })
    Body.setPosition(b[2], { x: _x / 2, y: y - -4 })
    Body.setPosition(b[1], { x: x - 4, y: _y / 2 })
    Body.setPosition(b[3], { x: -4, y: _y / 2 })
    Body.setPosition(bg, { x: x / 2, y: y - 101 })

    RestBall()
  }
  // nextTick(()=>{
  //   Resize();
  // })

onMounted(() => {
    Ew = canvas.value.offsetWidth
    Eh = canvas.value.offsetHeight
    nextTick(()=>{
        CreateRender();
        CreateBg();
        CreateBall();
        CreateMouse();
        WorldInit();
        if (!isMobile()) {
          window.addEventListener('resize', Resize);
          return;
        }
    })  
   
})


// 创建世界
function CreateBg(){
    const sprite = isMobile()  ? { texture: aboutImg.icity, xScale: .6, yScale: .6 } : { texture: aboutImg.icity };
    const bgw = isMobile() ? 616 : 880;
    const bgh = isMobile() ? 140 : 200;
    const bgy = isMobile() ? 62 : 101;
    const opts = {
      isStatic: true,
      render: {
        opacity: 0
      }
    }

    borders = [
      Bodies.rectangle(Ew / 2, -4, Ew + 2, 10, opts),
      Bodies.rectangle(Ew + 4, Eh / 2, 10, Eh + 2, opts),
      Bodies.rectangle(Ew / 2, Eh + 4, Ew + 2, 10, opts),
      Bodies.rectangle(-4, Eh / 2, 10, Eh + 2, opts)
    ]
    bg = Bodies.rectangle(Ew / 2, Eh - bgy, bgw, bgh, {
      isStatic: true,
      render: {
        fillStyle: 'none',
        sprite: sprite
      },
      isStatic: true,
      isSensor: true,
    })
}
// 建立渲染
function CreateRender() {
    _render = Render.create({
      element: canvas.value,
      engine: engine,
      options: {
        wireframes: false,
        width: Ew,
        height: Eh,
        showMousePosition: false, // 鼠标约束线
        showVelocity: false, // 移动刚体时速度
        background: 'none',
        pixelRatio: window.devicePixelRatio
      }
    })
  }

  
  // 鼠标约束
 function CreateMouse() {
    if (isMobile()) return;
    mouseConstraint = MouseConstraint.create(engine, {
      element: _render.canvas,
      constraint: {
        friction: .5,
        render: {
          visible: false
        }
      }
    });
  }
  // 重置小球
  function RestBall() {
    var promise1 = new Promise((resolve, reject) => {
      World.remove(engine.world, balls)
      resolve()
    })
    promise1.then(
      () => {
        CreateBall()
        World.add(engine.world, balls)
      }
    )
  }
  // 初始化小球
 function CreateBall() {
    balls = Composites.stack(0, 120, 6, 3, 0, 0, function (x, y) {
      const r = isMobile() ? 20 : 30
      return Bodies.circle(x, y, r, ballopts(r));
    });
  }
  
  // 陀螺仪
  const GetGravity =() => {
    let event = window.event;
    // console.log(event);
    var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
      gravity = engine.world.gravity;
    if (orientation === 0) {
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      gravity.y = Common.clamp(event.beta, -90, 90) / 90;
    } else if (orientation === 180) {
      gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
    } else if (orientation === 90) {
      gravity.x = Common.clamp(event.beta, -90, 90) / 90;
      gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
    } else if (orientation === -90) {
      gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
      gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
    }
  }

 function getDevicePermission() {
    if (typeof DeviceMotionEvent.requestPermission !== 'function') {
      // console.log('is pc');
      window.addEventListener('deviceorientation', GetGravity);
      showPermissionModal.value = false;
      return Promise.resolve();
    }

    return DeviceMotionEvent.requestPermission().then(res => {
      // console.log(res);
      if (res === 'granted') {
        window.addEventListener('deviceorientation', GetGravity);
        showPermissionModal.value = false;
        return;
      }
      showPermissionModal.value = false;
      return Promise.reject(0);
    })
    
  }

    // 初始化世界
 function   WorldInit() {
    World.add(engine.world, [...borders, bg, balls])
    isMobile() && World.add(engine.world, mouseConstraint)
    Engine.run(engine);
    Render.run(_render);
  }
  const closepop = () => {
            showPermissionModal.value=false;
  }
</script>
<style lang="scss">



</style>