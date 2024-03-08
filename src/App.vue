<script setup>
import { useTextStore } from './store/modules/text'
import { useRoute } from 'vue-router';
import { onMounted, watch, ref, onUnmounted } from 'vue';
import { isMobile } from '@/util/isMobile.js'
import SwitchAnimate from './components/SwitchAnimate.vue'
import HeaderPc from './components/header/pc.vue'
import HeaderMobile from './components/header/mobile.vue'
var loading = document.getElementById("pageloading")
let ischange = ref(false);
let routes = useRoute();
let timer = null
watch(routes, (newValue, oldValue) => {
  ischange.value = true;
  timer = setTimeout(() => {
    ischange.value = false;
  }, 1000)
})
// var loading = document.getElementById("pageloading")
onMounted(() => {
  // console.log(loading)
  //组件挂载完毕 删除
  if (loading) {
    document.body.removeChild(loading)
    loading = null
  }
})
onUnmounted(() => {
  clearTimeout(timer);
})
function tagchange(e) {
  ischange.value = e;
}
</script> 

<template>
  <div class="main">
    <header-pc class="headerPc" v-if="!isMobile()">
    </header-pc>
    <header-mobile v-else></header-mobile>
    <!-- <RouterLink to="/text">123</RouterLink>
  <div>{{ischange}}</div>
  <RouterLink to="/text1">456</RouterLink>
  <RouterLink to="/mobile">1456</RouterLink> -->
    <router-view>
    </router-view>
    <SwitchAnimate v-if="ischange" type='leave' @tagchange="tagchange"></SwitchAnimate>
  </div>
</template>

<style scoped lang="scss">
// @import './components/globalcss/index.scss'

$main_bg:#4456a7;
$font_name: "erikos","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","WenQuanYi Micro Hei",sans-serif;
$big_size:18px;
$radius:18px;
body {
  margin: 0;
  padding: 0;
}

.main {
  width: 100vw;
  height: 100%;
  position: relative;
  background-color: $main_bg;
  font-family: $font_name;
  overflow: hidden;
}

.headerPc {
  width: 100vw;
  background-color: #fff;
  border-bottom: 1px solid #111111;
  height: 36px;
  top: 0;
  box-sizing: border-box;
}

</style>
