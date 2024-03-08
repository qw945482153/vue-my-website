<template>
  <main :class='mainClass'>
    <div class='consMain'>
      <div class='fontMain'>
        <div class="phonto">
          <Photo />
        </div>
        <div class="mail">
          <Mail />
        </div>
      </div>
      <div class='introduce'>
        <div class='myintro'>
          <Introduce />
        </div>
        <div class='contact'>
          <div class='github'>
            <Git></Git>
          </div>
          <div class='weichart'>
            <WeiChart />
          </div>
        </div>
      </div>
    </div>
    <div class='addMain'>
      <div class='add'><MyAdd/></div>
          <div class='link'><OurLink/></div>
    </div>
    <Switch v-if="switchin" type="enter" @tagchange="switchOut" />
  </main>
</template>
<script setup>
import Switch from '../../components/SwitchAnimate.vue';
import Photo from './photo.vue';
import Mail from './mail.vue';
import WeiChart from './wechat.vue';
import MyAdd from './myadd.vue';
import Introduce from './introduce.vue';
import OurLink from './ourlink.vue'
import Git from './git.vue'
import { ref } from 'vue';
const mainClass = `page app-center aboutPage`;
let switchin = ref(true);
let switchOut = (e) => {
  switchin.value = e;
}


</script>
<style lang="scss" scoped>
@import url(./about.scss);
</style>