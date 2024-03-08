<template>
    <div style="width: 100%;height: 100%;">
        <Pop :noClose='true' title="WeChat" type="wathet" :unmove='true'>
            <div class='img'>
                <img :src='aboutImg.icode' alt="" />
            </div>
            <h3>C110112119120911X</h3>
        </Pop>
    </div>
</template>
<script setup>
import Pop from '../../components/windo/windo.vue';
import { aboutImg } from '../../components/imgurls';
</script>
<style lang="scss"></style>