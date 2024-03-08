<template>
     <div class="figure-pop-main">
        <ul class="settBox">
          <li>
            <div class="glitch">
              <img src="../../assets/img/glitch-1.png" alt=""/>
            </div>
          </li>
          <li>小白菜的个人网站</li>
          <li>v1.0.0</li>
          <li class="settLink"><a class='needsclick' @click="toAbout">View More</a></li>
          <li><hr align='center' width='60%' :style="{margin:'18px auto'}" color='#b99f51' size="1"/></li>
          <li>
              <em v-if="token">{{ user.email }}</em>
              <a v-else @click="showSign">尚未登陆</a>
          </li>
          <!-- <li><em>{this.props.other.user.name}</em></li> -->
        </ul>
        <!-- <CSSTransition
          in={this.state.isInput}
            key='testsss'
            timeout={200}
            unmountOnExit
            classNames="fade">
         <Portal>
           <Pop unmove={true} close={this.showSign.bind(this)} title="登陆" type="white">
            <SginIn user={this.props.other.user} close={this.showSign.bind(this)} isErro={this.props.other.isErro} setUser={this.props.other.setUser}/>
           </Pop>
         </Portal>
        </CSSTransition> -->
        <Pop :unmove='true' :close="islogin" title="登陆" type="white" @onclose="onclose" v-if="islogin">
          <SginIn :user='user' @close="closesgin" :isErro='isErro' @setUser='setUser'/>
        </Pop>
      </div>
</template>
<script setup>
import { ref } from 'vue'
import {isMobile} from '../../util/isMobile.js'
import Pop from '../../components/windo/windo.vue';
import SginIn from '../../components/sginin/sginin.vue'
let user = ref({});
let token = ref("");
if(localStorage.getItem('userInfo')){
  let b = localStorage.getItem('userInfo');
  user.value =JSON.parse(b);
  token = localStorage.getItem('xxxtoken');
}
let islogin = ref(false);
let isInput = ref(false);
function onclose(){
    islogin.value = false;
}
function toAbout(){
    isMobile()?document.querySelector(".mobile-nav").getElementsByClassName("a")[3].click():document.querySelector(".nav").getElementsByTagName("a")[3].click()
}
function closesgin(){
  islogin.value = false;
}
function showSign(){
  islogin.value = true;
}
</script>
<style lang="scss">
@media screen and (max-width: 480px) {
  ul.settBox{
      width:96vw;
  }
}
.figure-pop-main,.work-pop-main{
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom:20px;
  &::-webkit-scrollbar{
     width: 4px;
     border:none;
     box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: rgba(255,255,255,.6);
    border:none;
    box-shadow: none;
  }
  &::-webkit-scrollbar-track {
    border:none;
    box-shadow: none;       
    background: rgba(255,255,255,0)
  }
}
.settBox{
  width: 400px;
  padding: 20px 0;
  li{
    text-align: center;
    line-height: 1.5;
    hr{
      margin: 20px auto;
    }
    em{
      background-color: #fff
    }
  }
  li.settLink{
    color:#fff;
    font-weight: bold;
  }
}

.glitch{
  position:relative;
  width: 110px;
  height: 110px;
  background-color: #fff;
  border-radius: 50%;
  margin: 12px auto 24px auto;;
  img{
    position: absolute;
    z-index: 3;
    top: 54%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

@keyframes noise-anim{
  @for $i from 1 through 20{
     #{$i*5%}{clip:rect(random(100)+px,9999px,random(100)+px,0);}
  }
}
.glitch:after{
  content:url('../../assets/img/glitch-2.png');
  position:absolute;
  left: calc(50% - 2px);
  top: 56%;
  transform: translate(-50%,-50%);
  overflow:hidden;
  z-index: 4;
  clip:rect(0,900px,0,0); 
  animation:noise-anim 2s infinite linear alternate-reverse;
}



@keyframes noise-anim-2{
  @for $i from 1 through 20{
     #{$i*5%}{clip:rect(random(100)+px,9999px,random(100)+px,0);}
  }
}
.glitch:before{
  content:url('../../assets/img/glitch-3.png');
  position:absolute;
  left: calc(50% + 2px);
  top: 60%;
  transform: translate(-50%,-50%);
  overflow:hidden;
  z-index: 4;
  clip:rect(0,900px,0,0); 
  animation:noise-anim-2 3s infinite linear alternate-reverse;
}

</style>