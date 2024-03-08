<template>
    <Pop :noClose='true' title="Mail" type="pink" :unmove="true">
        <template #default>
            <div style="width: 100%;height: 100%;">
                <div class='img'>
                    <img :src='aboutImg.imail' alt="" />
                </div>
                <h3>945482153@qq.com</h3>
                <a href="mailto:945482153@qq.com" class='linkIcon'></a>
            </div>

        </template>
    </Pop>
</template>
<script setup>
import Pop from '../../components/windo/windo.vue';
import { aboutImg } from '../../components/imgurls';
</script>
<style lang="scss">
@import url(./about.scss);
</style>