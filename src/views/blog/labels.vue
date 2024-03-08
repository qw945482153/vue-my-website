<template>
    <span>
        <a class="blog-menu-label" target="_blank" :href='url' :style="{color: `#${color}`}">{{ Category[current] }}</a>
    </span>
</template>
<script setup>
import { ref,onMounted, watch } from 'vue'
let props = defineProps({
    color:{
        type:String,
        default:""
    },
    name:{
        type:String,
        default:''    
    },
    url:{
        type:String,
        default:''
    },
    labels:{
        type:Number,
        default:0
    }
})
let Category = ref(['前端开发','后端开发','mysql','算法题','其它'])
let current = ref(0);
watch(props,function(newValue,oldValue){
    current.value = newValue.labels;
})
let {color,name,url} = ref(props)

onMounted(() => {
})
// function getCate(){
//     console.log("执行了么?");
//     getCategory().then(res => {
//         console.log("文章id");
//     })
// }
</script>
<style>
@import url(./blog.scss);
</style>