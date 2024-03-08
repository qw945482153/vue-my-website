<template>
    <div style="width: 100%;height: 100%;">
        <Pop :noClose='true' title="Where" type="wathet" :unmove='true'>
            <div class='addImg'>
         <img :src='aboutImg.iadd' alt=""/>
      </div> 

        </Pop>
    </div>
</template>
<script setup>
import Pop from '../../components/windo/windo.vue';
import { aboutImg } from '../../components/imgurls';
</script>
<style lang="scss"></style>