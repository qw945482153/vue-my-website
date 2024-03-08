<template>
    <Pop :no-close="true" title="Phonto" type="main" :unmove="true">
        <template #default>
            <div style="width:100%;height:100%">
                <div class="myfont">
                <img :src="aboutImg.myfont" alt="" />
            </div>
            </div>
        </template>
    </Pop>
</template>
<script setup>
import Pop from '../../components/windo/windo.vue';
import {aboutImg} from '../../components/imgurls';

</script>
<style lang="scss">
@import url(./about.scss);
</style>