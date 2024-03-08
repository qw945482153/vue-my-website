<template>
    <div class="sginDiv">
      <img :src='token? homeImg.smile: homeImg.mail' alt=""/>
      <h1>{{token?(isnew==1?'第一次来吧，取个名呗':''):'邮箱地址登陆'}}</h1>
      <p>{{token?(isnew==1?'净化荧屏，世界和平。请勿使用敏感词汇':''):'邮箱地址是您的唯一标示，认真点啊'}}</p>
      <div class='sginInput'>
        <input type="text" v-if="!token" placeholder='请输入您的邮箱' v-model="state.email"/>
        <input type="text" v-if="token&&isnew==1" :placeholder="'请输入用户名'" v-model="state.nameInput"/>
        <button v-if="token&&isnew==1" :class='state.erro?"buttonAnimate":""' @click='getName'>OK</button>
        <button v-if="!token" :class="state.erro?'buttonAnimate':''" @click='getUser'>OK</button>
      </div>
      <div class='erroText'>{{state.erroText}}</div>
    </div>
</template>
<script setup>
import { ref, onUnmounted } from 'vue';
import {homeImg} from '../../components/imgurls';
import checkText from '../../util/checkText';
import {weblogin, websetname} from '../../util/api/api'
let emit = defineEmits();
const checkMail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
let state = ref({
    email:null,
    nameInput:'',
    erro:false,
    erroText:""
})
let user = ref(localStorage.getItem('userInfo'));
let token = ref(localStorage.getItem('xxxtoken'));
if(user.value){
  state.value.email = user.value.email;
}
let isnew = ref(0)
let timeOuts = null;
// 敏感词汇检测
function CheckTexts(str){
    for(let i = 0; i < checkText.length; i++){
        if(str.indexOf(checkText[i])>-1)
        {
            return false;
        }
    }
    return true;
}
// 邮箱地址请求
function getUser(){
    if(state.value.erro) return false; // 判读是否执行错误
    const value = state.value.email.toString().replace(/<|>/g,'');
    if(!checkMail.test(value)) return alert("请输入正确的邮箱地址")
    //请求登陆
     weblogin({email:value}).then(res=>{
      token.value = res.token;
      isnew.value = res.isnew;
      console.log(token.value,isnew.value);
      user.value = res.data;
      localStorage.setItem('xxxtoken',token.value);
      localStorage.setItem('userInfo',JSON.stringify(res.data));
      if(isnew.value == 0){
          emit('onclose',"")
      }
     }, err => {
      state.value.erro =  true;
      state.value.erroText = err;
     })
}

// 获取用户名请求注册接口
function getName(dom){
    if(state.erro) return false;
    const value = state.value.nameInput.toString().replace(/<|>/g,'')
    if(!CheckTexts(value)) return alert("禁止使用敏感词汇");
    // 请求注册

    websetname({email:state.value.email,name:value}).then(res=>{
      getUser();
    },err => {
      state.value.erro =  true;
      state.value.erroText = err;
    })
}
const  upErro = (text) => {
    state.value.erro = true;
    state.value.erroText = text;
}
onUnmounted(() => {
    clearInterval(timeOuts);
})
</script>
<style lang="scss">
$color_error: #f95f56;
.sginDiv{
    padding: 16px 80px;
    img {
        display: block;
        margin: 42px auto 20px auto;
    }
    h1{
        text-align: center;
        color:#1a1a1a;
        font-weight: bold;
        font-size: 1.6rem;
    }
    p{
        text-align: center;
        color:#ccc;
        font-size: 1rem;
        background: none;
        border: none;
        line-height: 2
    }
    .sginInput{
        width: 360px;
        margin: 30px auto;
        position: relative;
        input{
            float: left;
            width: 200px;
            height: 48px;
            border-radius: 24px;
            background-color: #f1f1f1;
            border:none;
            font-size: 14px;
            padding-left: 12px;
        }
        button{
            display: block;
            width: 128px;
            height: 48px;
            background-color: #f95f56;
            font-size: 1.2rem;
            color: #fff;
            font-weight: bold;
            float: right;
            border-radius: 24px;
        }
        &::after{
            content: '';
            display: block;
            clear: both;
        }
    }
}
.erroText{
    position: absolute;
    bottom:10px;
    text-align: center;
    width: 100%;
    left: 0;
    color: $color_error;
}
.buttonAnimate{
  animation: erroText 0.3s ease-in-out forwards
}

@keyframes erroText{
  0%{
    transform: translateX(0)
  }
  15%{
    transform: translateX(-6px)
  }
  40%{
    transform: translateX(6px) 
  }
  65%{
    transform: translateX(-6px)
  }
  90%{
    transform: translateX(6px)
  }
  100%{
    transform: translateX(0)
  }
}
@media screen and (max-width: 480px) {
  .sginDiv{
      padding: 16px 0;
      img{
        margin: 1.6rem auto 1rem auto;
      }
      .sginInput{
          width:96vw;
          input{
              display: block;
              float: none;
              margin: 0 auto;
          }
          button{
              float: none;
              margin: 1.6rem auto
          }
      }
  }
}
</style>