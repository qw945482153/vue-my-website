<template>
  <div class="header">
    <div class="app-center">
        <div class="mobile-logo">
            <img src="https://rockcelltech.top/assets/log.92dfa51d.png" alt="" />
            <span>Pakchoi</span>
        </div>
        <a @click="toggleNav" :class='["mobile-menu", isShow ? "mobile-menu-active" : ""]'>
            <div></div>
            <div></div>
            <div></div>
        </a>
        <nav :class="['mobile-nav', active]">
            <a v-for="(item, index) in navlist" :to="item.herf" @click="toLink(item)">
                {{ item.text }}
            </a>
        </nav>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
const routes = useRoute();
const router = useRouter();
// console.log(routes);
const menuClass = ref("")
const active = ref('');
const timeOut = ref("");
const isShow = ref(false);
const now = ref(0)
const setHistory = null;
const navlist = [
    { text: 'HOME', herf: '/mobile' },
    { text: 'BLOG', herf: '/blog' },
    { text: 'WORK', herf: '/work' },
    { text: 'ABOUT', herf: '/about' }
]

//监听当前index

watch(routes, (newValue, oldValue) => {
    for (let i = 0; i < navlist.length; i++) {
        if (oldValue.fullPath == navlist[i].herf && i != now.value) {
            now.value = i;
            break;
        }
    }
})
function HashIndex(){

}
function toggleNav(click) {
    clearTimeout(timeOut.value)
    const type = click === 1 ? true : isShow.value
    isShow.value = !type;
    active.value = type ? 'mobile-live-active' : 'mobile-in-active'
    if (type) timeOut.value = setTimeout(() => { active.value = '' }, 300)
}
function toLink(n) {
    // if(n.text==='BLOG')return window.location.href='http://blog.vanoc.top'
    toggleNav(1)
    const index = navlist.indexOf(n)
    if (index === now.value) return;
     setTimeout(() => {
      router.push(navlist[index].herf)
    }, 1000)
}
</script>
<style lang="scss">
$b_border:1px solid #111111;
$color_main:#ffd03f;
.header{
    width: 100%;
    background-color: #fff;
    border-bottom: $b_border;
    height: 36px;
    box-sizing:content-box;
}
// @mixin mainBox {
//   width: calc(100% - 120px);
//   margin: 0 auto;
//   position: relative;
//   top: 0;
// }
// .app-center{
//   padding: 0px;
//   margin: 0 auto;
//   position: relative;
//   top: 0;
//   left: 0;
//   // @include mainBox();
// }
.mobile-logo{
      position: relative;
      img{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 46px;
        height: 40px;
      }
      span{
        font-size: 1rem;
        font-weight: bold;
        line-height: 38px;
        padding-left: 32px;

      }
    }
    .mobile-menu{
      display: block;
      position: absolute;
      z-index:999;
      top: 8px;
      right: 0;
      width: 22px;
      height: 22px;
      &.mobile-menu-active{
        div:nth-child(1){
          transform: translate(0,6px) rotate(45deg);
        }
        div:nth-child(2){
          transform: translate(-3px,0);
          opacity: 0;
        }
        div:nth-child(3){
          transform: translate(0,-6px) rotate(-45deg);
        }
      }
      div{
        background: #111;
        width: 100%;
        height: 2px;
        margin: 4px 0 0;
        transition: all .15s cubic-bezier(0,.3,.8,1) 0s;
      }
    }
    .mobile-nav{
      visibility: hidden;
      position: fixed;
      background-color: $color_main;
      top: 0;
      left: 0;
      z-index: 900;
      width: 100vw;
      height: 100vh;
      padding-top: 14vh;
      opacity: 0;
      transition: opacity .25s cubic-bezier(0,.3,.8,1) 0s;
      a{
        display: block;
        line-height: 2.6;
        text-align: center;
        font-size: 1.8rem;
        text-decoration: underline;
        transform: translate(0, 8px);
        opacity: 0;
      }
      a:nth-child(1){
        transition: all .25s cubic-bezier(0,.3,.8,1) 0s;
      }
      a:nth-child(2){
        transition: all .25s cubic-bezier(0,.3,.8,1) .07s;
      }
      a:nth-child(3){
        transition: all .25s cubic-bezier(0,.3,.8,1) .15s;
      }
      a:nth-child(4){
        transition: all .25s cubic-bezier(0,.3,.8,1) .23s;
      }
      &.mobile-in-active{
        visibility: visible;
        opacity: 1;
        a{
          transform: translate(0,0);
          opacity: 1;
        }
      }
      &.mobile-live-active{
        visibility: visible;
        opacity: 0;
        a{
          transform: translate(0,8px);
          opacity: 0;
        } 
      }
    }
</style>