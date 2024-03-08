<template>
    <div class="page">
        <div class="app-center">
            <text-node></text-node>
            <footer-node></footer-node>
            <my-icon :user="state.user" @setUser="setLoading" @isErro="isErro" @changecurrent="changecurrent" ></my-icon>
        </div>
        <win-do type="main" title="说明" :no-close="false" v-if="state.showmes" @onclose="onclose">
            <showMe></showMe>
        </win-do>
        <win-do type="wathet" title="留言" :no-close="false" v-if="isSay" @onclose="onclose">
            <Msg></Msg>
        </win-do>
        <win-do type="setting" title="设置" :no-close="false" v-if="isSet" @onclose="onclose">
            <Setting></Setting>
        </win-do>
    </div>
</template>
<script setup>
import TextNode from '../../../components/text/nodeText.vue';
import showMe from '../../../components/ShowMe/ShowMe.vue';
import nodeText from '../../../components/text/nodeText.vue';
import FooterNode from '../../../components/footer/footer.vue';
import MyIcon from '../../../components/MyIcon/MyIcon.vue';
import winDo from '../../../components/windo/windo.vue';
import Msg from '../../../components/msg/msg.vue';
import Setting from '../../../components/Setting/Setting.vue';
import { ref, onMounted } from 'vue';
let state = ref({
    switch:true,
    user:{
        email:null,
        name:null
    },
    model:false,
    modelType:'ok',
    showmes: false,
    current: -1
})
let upload = ref(0);
let isSay = ref(false);
let isSet = ref(false);
onMounted(() => {
    let email = localStorage.getItem('testEmali');
    if(email){
        state.value.user.name = email.name;
        state.value.user.email = email.email;
    }
})
function setLoading(opt){
    state.value.user.name = opt.name;
    state.value.user.email = opt.email;
    localStorage.setItem('testEmali',opt);
}
function isErro(){
    state.value.modelType = 'err';
    // model.show();
    
}
function onclose(e){
    clearpop();
}
function changecurrent(e) {
    clearpop();
    setTimeout(() => {
        if (e == 1) {
            state.value.showmes = true;
        }
        else if (e == 2) {
            isSay.value = true;
        }else if(e == 3) {
            isSet.value = true;
        }
        state.value.current = e;
    }, 200);

}
function clearpop() {
    isSay.value = false;
    isSet.value = false;
    state.value.showmes = false;
}
</script>
<style lang="scss">
.page{
    height: calc( 100% - 36px );
    .app-center{
        height: 100%;
    }
}
@font-face {
    font-family: 'erikos';
    src: url('https://rockcelltech.top/images/font/erikos.woff2') format('woff2'),
         url('https://rockcelltech.top/images/font/erikos.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-size:67.5%;
}
@mixin mainBox {
    width: calc(100vw - 100px);
    margin: 0 auto;
    position: relative;
  }
.app-center{
    @include mainBox();
  }

@media screen and (max-width: 1440px) {
  html{
    font-size: 16px;
  }
}

@media screen and (max-width: 960px) {
  .app-center{
      width: calc(100vw - 80px);
  }
  html{
    font-size: 14px;
  }
}
@media screen and (max-width: 768px) {
  .app-center{
      width: calc(100vw - 60px);
  }
}
@media screen and (max-width: 480px) {
  .app-center{
      width: calc(100vw - 20px);
  }
  .figure-pop-main{
    max-width:96vw;
    max-height: 50vh !important;
    -webkit-overflow-scrolling: touch;
  }
  article.work-pop-main{
    width: calc(96vw - 32px);
    height: 70vh;
    max-height: 70vh;
    -webkit-overflow-scrolling: touch;
  }
  div[class*='figure-style-']{
    border-radius: .8rem;S
    &>p{
      border-radius: .8rem .8rem 0 0
    }
  }
  .main header .times span{
    display: none
  }
  .figure-style-err{
    max-width:80vw;
    width: 80vw;
  }
}
@media screen and (max-width: 350px){
  .figure-flex{
    figure{
      margin: 8px;
    }
  }
}
</style>