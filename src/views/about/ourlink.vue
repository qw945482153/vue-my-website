<template>
    <div style="width: 100%;height: 100%;">
        <Pop :noClose='true' title="Friends" type="pink" :unmove='true'>
            <div class='addImg'>
                <div class='firends'>
                    <a v-for="(item,index) in firendsarr" :key="index" :href='item.href'><span>{{item.name}}</span>{{item.title}}</a>
                </div>
            </div>

        </Pop>
    </div>
</template>
<script setup>
import Pop from '../../components/windo/windo.vue';
import {ref} from 'vue'
let firendsarr = ref([])
</script>
<style lang="scss"></style>