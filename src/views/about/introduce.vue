<template>
    <Pop :no-close="true" title="About Me" type="light" :unmove="true">
        <template #default>
            <div style="width:100%;height:100%">
                <div class='city'>
                    <CityRun />
                    <div class="mylabel">
                            <span v-for="(item,index) in labels" :key="index" class="cloud" :style="{left:`${4+index*14}%`,top:`${16+(index%2)*14}%`}">
                                <img :src="aboutImg.icloud" />
                                <strong>{{ item }}</strong>
                            </span>
                    </div>
                </div>
            </div>
        </template>
    </Pop>
</template>
<script setup>
import { ref } from 'vue';
import Pop from '../../components/windo/windo.vue';
import CityRun from './city.vue';
import { aboutImg } from '../../components/imgurls';
import MyLabel from './label.vue'
const labels = ref([
    '#狮子座','#90后','#前端','#开朗阳光大男孩','#慢热'
])
</script>
<style lang="scss">
@import url(./about.scss);
</style>