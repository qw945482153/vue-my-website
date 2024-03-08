<template>
    <div class='msgCenter' style="position: relative;">
        <div @scroll="onScroll" class="figure-pop-main" >
          <div v-if="state.onReset" class="loading-spinner"></div>
          <ul v-else ref="msgUl" class='msgBox'>
                <li  v-for="(item,index) in state.msgs" :key="index" class="showMsg">
                    <div class="msgTitle">
                        <strong>{{ item.username }}</strong><span>{{ item.create_time }}</span><span @click="upSup(index)" class='msgLight'><a></a>({{item.like}})</span>
                    </div>
                    <div class="message">
                        {{ item.content }}
                    </div>
                    <span class='bubble' v-if="current == index">

                    </span>
                </li>
            </ul>
            <div :style='{textAlign:"center",transform:"translateY(-50px)"}'>{{state.moreText}}</div>
        </div>
        <span v-if="!user" @click="openShow" class="putButton">
            留言
        </span>
        <div v-else @mousedown.stop="false" class='msgInput'>
            <input v-model="cont" placeholder="净化荧屏，世界和平" type="text" />
            <span @click='messagesUp' class='msgButton'>留言</span>
        </div>
        <div  class="fade" v-if="islogin">
                <Pop :unmove='true' @onclose="toggleShow" title="登陆" type="white" >
                    <SginIn :user='user' @onclose="toggleShow" :isErro='props.isErro'
                        :setUser='props.setUser' />
                </Pop>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { websetmessage, getmessage, addMessageLike } from '../../util/api/api'
import checkText from '../../util/checkText';
import Pop from '../../components/windo/windo.vue';
import SginIn from '../../components/sginin/sginin.vue';
let islogin = ref(false);
let props = defineProps({
    user:{
        type:Object||String,
        default:""
    },
    isErro:{
        type:Boolean,
        default:false
    },
    setUser:{
        type:Object||String,
        default:""
    }
})
let bubbles = ref([])
let user = ref("");
let token = ref("");
let cont = ref("");
let current = ref(-1);
let state = ref(
    {
        isInput: false,
        msgs: [],
        onReset: false,
        moreText: null
    }
)
if(localStorage.getItem('userInfo')){
    let b = localStorage.getItem('userInfo')
    user.value = JSON.parse(b)
    token.value = localStorage.getItem('xxxtoken')
}
let onload = ref(false);
let loadAll = ref(false);
let restTimeout = null;
let pageSize = ref(10);
let pageNum = ref(1);
let pageMax = ref(1);
let timer = null;
let upNum = ref(0)
let currenttime = null;
onMounted(() => {
    reList();
    // 每400ms请求一次留言
    restTimeout = setTimeout(() => {
        getShowMsg();
    }, 400);
})
onUnmounted(() => {
    clearTimeout(restTimeout);
    clearTimeout(timer);
    clearTimeout(currenttime)
})
function reList() {
    state.value.onReset = true;
}
function getShowMsg() {
    // 请求获取留言
    getmessage({pageNum: pageNum.value,pageSize: pageSize.value}).then(res=>{
        // console.log(res);
        if(pageNum.value==1){
            let data = res.data;
            data.forEach(arr => {
                 const time = new Date(arr.create_time)
                 const now = new Date().getTime() - time.getTime()
                arr.create_time = now > 24 * 60 * 60 * 1000  ? time.getFullYear() + '-' + (+time.getMonth() + 1) + '-' + time.getDate() : ( (now > 60 * 60 * 1000) ?~~(now / 3600000)+'小时前' : ~~(now / 60000) + '分钟前')
            })
            state.value.msgs = data;
        }else{
           let data = res.data;
           data.forEach(arr => {
            const time = new Date(arr.create_time)
            const now = new Date().getTime() - time.getTime()
            arr.create_time = now > 24 * 60 * 60 * 1000  ? time.getFullYear() + '-' + (+time.getMonth() + 1) + '-' + time.getDate() : ( (now > 60 * 60 * 1000) ?~~(now / 3600000)+'小时前' : ~~(now / 60000) + '分钟前')
            state.value.msgs.push(arr);
           })
        }
        pageNum.value = Number(res.currentPage);
        pageSize.value = Number(res.pageSize);
        pageMax.value = res.lastPage;
        state.value.onReset = false;
    })
}
function openShow(){
    islogin.value = true;
    state.value.isInput = !state.value.isInput;
}
// 弹出关闭登陆窗
function toggleShow() {
    islogin.value = false;
    state.value.isInput = !state.value.isInput;
    let b = localStorage.getItem('userInfo')
    user.value = JSON.parse(b)
    token.value = localStorage.getItem('xxxtoken')
}
function checkTexts(str) {
    let _str = str.toString().replace(/<|>/g, ' ')
    let reg = ''
    checkText.map(i => {
        reg = new RegExp(i, "g")
        _str = _str.replace(reg, "河蟹")
    })
    return _str
}
function messagesUp() {
    // console.log(token.value,user.value);
    if(!token.value) return islogin.value = true;
    loadAll.value = false;
    let value = checkTexts(cont.value);
    if (value.replace(/\s+/g, "") === "") return alert("未填写内容");
    // 留言请求
    // console.log(user.value,localStorage.getItem('userInfo'));
    let data = {
        content: value,
        email_id: user.value.email,
        username: user.value.username
    }
    // axios.post('http://localhost:3000/api/blog/webmessages',data).then(res=>{
    //     console.log(res);
    // })
    websetmessage(data).then(res=>{
        alert("发表成功！");
    }, err => {
        alert("发表失败，原因是:" +err);
    })
}
function onScroll(e) {
    let msgUl = ref();
    if (msgUl.offsetHeight - e.target.scrollTop - e.target.offsetHeight < 10) {
        if (pageNum.value > pageMax.value) return;
        pageNum.value = pageNum.value + 1;
        state.value.moreText = "正在加载中..."
        getShowMsg();
        //请求留言
    }
}
function upSup(index){
    current.value = -1;
    state.value.msgs[index].like = Number(state.value.msgs[index].like) + 1
    bubbles.value.push({
        time:new Date().getTime() // 添加新的泡泡动画元素
    })
    upNum.value ++;
    clearTimeout(currenttime)
    currenttime = setTimeout(()=>{
        current.value = index;
    },100)
    
    clearTimeout(timer)
    timer = setTimeout(upAxios(index), 1000) // 点击之后600毫秒才会提交连续点赞后的值
}
function upAxios(index){
    addMessageLike(state.value.msgs[index].id,state.value.msgs[index].like).then(res => {

    }, err => {
        state.value.msgs[index].like = Number(state.value.msgs[index].like) - 1;
        alert("点赞失败:" +err)
    })
}
function outBubble(bub){
    const newBubs = bubbles.value
    // console.log(newBubs);
    const index = newBubs.indexOf(bub)
    newBubs.splice(index,1)
    bubbles.value = newBubs;
}
</script>
<style lang="scss">
$color_main:#ffd03f;
$font:"lucida Grande",Verdana;
$msg_t_color: #055559;
.figure-pop-main{
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom:20px;
  width: 100%;
  &::-webkit-scrollbar{
     width: 4px;
     border:none;
     box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: rgba(255,255,255,.6);
    border:none;
    box-shadow: none;
  }
  &::-webkit-scrollbar-track {
    border:none;
    box-shadow: none;       
    background: rgba(255,255,255,0)
  }
}
@mixin button {
    display: block;
    width: 160px;
    line-height: 58px;
    color: #1a1a1a;
    background-color: #fff;
    border-radius: 29px;
    text-align: center;
    cursor: pointer;
}

.bubble {
    font-size: 28px;
    color: $color_main;
    position: absolute;
    top: 0;
    right: 0;
    animation: popUp 0.5s linear forwards;

    &::before {
        content: url('../../assets//img/bubble.png')
    }
}

.showMsg {
    opacity: 0;
    transform: translateY(40px);
    animation: msgUl .3s ease-out forwards;
}
.loading-spinner{
  position: absolute;
  width: 104px;
  bottom: 50%;
  left: 50%;
  height: 34px;
  transform: translate(-50%,-50%);
  background: url('../../assets/gifs/loading.gif') no-repeat center;
}

.msgTitle {
    strong {
        color: $msg_t_color;
        font-size: 1.4rem;
    }

    strong+span {
        margin-left: 6px;
        color: #0a7d83;
        font-size: .8rem;
    }

    .msgLight {
        color: $msg_t_color;
        float: right;
        margin-top: 6px;

        a {
            display: block;
            width: 30px;
            height: 22px;
            float: left;
            margin-top: -4px;
            background: url('../../assets/img/light.png') no-repeat center;
            background-size: 100% 100%;
        }
    }
}

.message {
    border: 1px solid #1ab0b8;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: #aaf6fa;
    color: #0a7d83;
    padding: 12px;
    margin: 4px 0 20px 0;
}

.msgCenter {
    width: 540px;
    height: calc(60vh + 20px);
}

.msgBox {
    width: 540px;
    box-sizing: border-box;
    padding: 24px 10px 60px 10px;
    min-height: 60vh;
    font-family: $font li {
        position: relative;
    }
}

.putButton {
    @include button();
    position: fixed;
    bottom: -90px;
    left: 50%;
    transform: translateX(-50%);
}

.msgInput {
    position: absolute;
    bottom: -90px;
    width: 100%;

    input {
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, .6);
        width: calc(100% - 176px);
        height: 58px;
        line-height: 58px;
        background-color: #6978b9;
        border-radius: 29px;
        float: left;
        padding-left: 18px;
        color: #fff;

        &:hover {
            border-color: rgba(255, 255, 255, 1)
        }

        &::-webkit-input-placeholder {
            color: #fff
        }

        &::-moz-input-placeholder {
            color: #fff
        }

        &::-o-input-placeholder {
            color: #fff
        }

        &::-ms-input-placeholder {
            color: #fff
        }
    }
}

.msgButton {
    @include button();
    float: right;
}

@keyframes popUp {
    0% {
        opacity: 0;
        transform: translate3d(0, 0, 0)
    }

    25% {
        opacity: .5;
        transform: translate3d(0, -8px, 0)
    }

    50% {
        opacity: 1;
        transform: translate3d(0, -16px, 0)
    }

    75% {
        opacity: 1;
        transform: translate3d(0, -24px, 0)
    }

    100% {
        opacity: 0;
        transform: translate3d(0, -32px, 0)
    }
}

@keyframes msgUl {
    0% {
        opacity: 0;
        transform: translateY(40px)
    }

    100% {
        opacity: 1;
        transform: translateY(0)
    }
}

@media screen and (min-width: 768px) {
    .msgBox {
        padding: 24px 24px 60px 24px;
    }

    .message {
        margin: 4px 0 26px 0
    }

    .msgTitle {
        strong {
            font-size: 22px;
        }

        strong+span {
            font-size: 14px
        }

        .msgLight {
            font-size: 14px;
        }
    }
}

@media screen and (max-width: 480px) {
    .msgCenter {
        width: 96vw;
        height: calc(50vh + 20px);
    }

    .msgBox {
        width: 96vw;
    }

    .putButton {
        width: 10rem;
        bottom: -6rem;
    }

    .msgButton,
    .msgInput>input {
        line-height: 4rem;
        border-radius: 2rem;
        height: 4rem;
    }

    .msgButton {
        width: 10rem;
    }

    .msgInput {
        bottom: -6rem;
    }

    .msgInput>input {
        width: calc(100% - 11rem)
    }
}</style>