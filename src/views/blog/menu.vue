<template>
   <div class="blog-menu-content">
        <ul class="blog-menu-list" >
            <li v-for="(item,index) in article" :key="index" :class="[index== current?'blog-menu-index':'blog-menu-wait']" @click="changeArticle(index)">
                <h3 class="blog-menu-title">{{item.title}}</h3>
                <div>
                  <span class="blog-menu-time">{{ moment(item.create_time).format('YYYY-MM-DD hh:mm') }}</span>
                   <Labels :labels="item.category_id"></Labels>    
                </div>
            </li>
        </ul>
      </div>
</template>
<script setup>
import moment from 'moment'
import Labels from './labels.vue'
import { ref, computed } from 'vue'
let props = defineProps({
    current:{
        type:Number,
        default:0
    },
    articles:{
        type:Array,
        default:[]
    }
});
let emit = defineEmits();
let current = computed(() => {

    return props.current
})
let article = computed(() => {

    return props.articles
})
let changeArticle = (e) => {
    emit('changeArticle',e)
}
</script>
<style lang="scss">
@import url(./blog.scss);

</style>