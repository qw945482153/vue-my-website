<template>
    <div class="page app-center">
        <div :class="['blog-main',isMobile()?styless:'']">
          <Pop
            :noClose="true"
            title="Blogs"
            type="white"
            :unmove="true"
            classz="blog-menu-box"
          >
            <template v-slot>
              <Menu :articles="articles" :current="current" @changeArticle="changeArticle"/>
            </template> 
           
          </Pop>
          <Pop
            :noClose='true'
            :title="currentArticle.title || ''"
            type="white"
            :unmove="true"
            classz="blog-article-box"
          >
            <template v-slot>
              <Article  ref="articleComponent"   :articledatas="currentArticle"  :userInfos="userInfo" />
              <!-- <Article 
              ref="articleComponent" 
              @showLogin="()=>this.showLogin()" 
              @reGetter="()=>this.getArticleList()" 
              @resetUserInfo="data=>this.resetUserInfo(data)"
              :articledata="currentArticle" 
              :userInfo="userInfo"
            /> -->
            </template>
          </Pop>
        </div>
        <span v-if="isMobile()" class="blog-toggle" @click="toggleMenu">
            {{lookPage ? 'BACK' : 'VIEW'}}
        </span>
        <Switch v-if="switchin" type="enter" @tagchange="switchOut"/>
      </div>
</template>
<script setup>
import Menu from './menu.vue';
import { ref, onMounted, computed } from 'vue';
import { getHotlist } from '../../util/api/api'
import { isMobile } from '../../util/isMobile';
import Pop from '../../components/windo/windo.vue';
import Article from './Article.vue';
import Switch from '../../components/SwitchAnimate.vue'
import * as blogCss from './blog.scss';
let switchin = ref(true);
let articles = ref([]);
let current = ref(0)
let lookPage = ref(false)
let shwoLogin = ref(false)
let userInfo = ref({})
let articleComponent = ref()
let currentArticle = ref({})
let height = ref(null)
function switchOut(n){
    switchin.value = n;
}
//'blog-look':'blog-mobile'
let styless = ref('blog-mobile')
    // console.log(isMobile())

onMounted(() => {
    getArticleList() //获取文章列表
    getUserInfo() //获取登录信息
})
const changeArticle =  (index) =>{
    articleComponent.value.scropTop();
    current.value = index;
    currentArticle.value = articles.value[index];
    if(isMobile()){
      if(lookPage.value==false){
      lookPage.value = true;
      styless.value = 'blog-look'
    }else{
      lookPage.value = false;
      styless.value = 'blog-mobile'
    }
    }else{
      lookPage.value = true;
    }
    
}
const toggleMenu = () => {
    // lookPage.value = !lookPage.value;
    // console.log(lookPage.value)
    if(lookPage.value==false){
      lookPage.value = true;
      styless.value = 'blog-look'
    }else{
      lookPage.value = false;
      styless.value = 'blog-mobile'
    }
}
const setLoginStatus = (statis) => {
    showLogin.value = statis;
}
const showLogin = () => {
    showLogin.value = true;
    lookPage.value = true;
    currentArticle.value = {
        title:"Github授权",
        needLoginTithub:true
    }
}
const getArticleList = async () => {
  let data = await getHotlist();
  articles.value = data.data
  current.value = 0;
  currentArticle.value = data.data[0]
}
const getUserInfo = async () => {

}

</script>
<style lang="scss">
@import url(./blog.scss);
.page{
  height: calc(100% - 36px);
}
</style>
