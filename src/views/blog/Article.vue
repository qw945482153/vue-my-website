<template>
    <div ref="article" id="articlss" class="article blog-article">
        <div class="article-center">
            <h1> {{ArticleDet.title}} </h1>
            <a target="_blank" :href="html_url">[原文链接]</a>
            <span class="blog-menu-time">{{moment(ArticleDet.create_time).format('YYYY-MM-DD')}}</span>
            <Labels :labels="ArticleDet.category_id" />
            <div class="view" v-purify-html="ArticleDet.content"></div>
            <Comments :data="ArticleDet"  />
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { getArticlesDet } from '../../util/api/api'
import moment from 'moment'
import Labels from './labels.vue'
import Comments from './comments.vue'
let propsz = defineProps({
    articledatas: {
        type: Object,
        default: {}
    },
    userInfos:{
        type:Object,
        default:{}
    }
})

let html_url = ref("");
let Articledata = ref({});
let ArticleDet = ref({});
onMounted(()=>{
})

watch(propsz,(newvalue,oldvalue) => {
    Articledata.value = newvalue.articledatas;
    console.log(Articledata.value);
    getArticle();
})
const getArticle = () => {
    let id = Articledata.value.id;
    getArticlesDet(id).then(res => {
        ArticleDet.value = res.data[0];
    })
}
function scropTop(e){
    document.querySelector('#articlss').scrollTop=0;
}
defineExpose({
 scropTop
})
</script>
<style lang="scss" scoped>
@import url(./blog.scss);
</style>