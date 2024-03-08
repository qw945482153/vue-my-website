<template>
    <div style="width: 100%;height: 100%;">
        <Pop :noClose='true' title="GitHub" type="violet" :unmove='true'>
              <div class='img'>
                <img :src='aboutImg.igit' alt="" />
              </div>
              <h3>https://github.com/qw945482153</h3>
              <a href="https://github.com/qw945482153" rel="external" target="_blank" class='linkIcon'></a>
            </Pop>
    </div>
</template>
<script setup>
import Pop from '../../components/windo/windo.vue';
import {aboutImg} from '../../components/imgurls';
</script>
<style lang="scss">
@import url(./about.scss);
</style>