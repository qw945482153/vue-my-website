<template>
   <div class="chatBox">
        <div class="chatBox_cont">
            <view class="chatBox_cont-ps" v-if="chatArr.length==0">请开启聊天对话！</view>
            <view v-else v-for="(item,index) in chatArr" :key="index" :class="[item.role=='ai鸭'?'chatBox_cont-ai':'chatBox_cont-user']" >
                <view class="user_icon">
                    <div class="user_icon_img">
                        <img :src="item.role == 'ai鸭'? gameImg.ai_head : gameImg.usr" />
                    </div>
                    <div class="user_icon_name">
                        {{ item.role }}
                    </div>
                </view>
                <view class="uesr_cont">
                    {{ item.cont }}
                </view>
            </view>
            <div class="chatBox_ps" v-if="disabled">Ai狼回复中。。。。。。。。。</div>
            <div class="chatBox_cont-bt" @click="cleadlog" >清除</div>
        </div>
        
        <div class="chatBox_input">
            <div class="chatBox_input_left" :style="{background:disabled?'#dcdcdc':''}" >
                <input class="chatBox_input_left_input" :placeholder="disabled?'Ai狼回答中~~':'请输入内容,比如：你好'"  v-model="inputvalue" :disabled="disabled" />
            </div>
            <div :class="[disabled?'chatBox_input_right':'chatBox_input_right1']" @click="goask">
                发送
            </div>
        </div>
    </div>
</template>
<script setup>
import { gameImg } from '../../components/imgurls';
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { getgeneration } from '../../util/api/api'
const getImgSrc = inject('getImgSrc')
const inputvalue = ref("");
const disabled = ref(false)
let chatArr = ref([
   
])
onMounted(() => {
    if(localStorage.getItem('chatlog')) {
        const data  = localStorage.getItem('chatlog');
        chatArr.value = JSON.parse(data);
    }
    
})
onUnmounted(() => {
    localStorage.setItem('chatlog',JSON.stringify(chatArr.value));
})
const goask = () => {
    if(!inputvalue.value){
        return alert("内容为空!!!");
    }
    let cont = inputvalue.value;
    inputvalue.value = "";
    disabled.value = true;
    let userlist = {
        role: '骚年',
        cont: cont
    }
    let ailist = {}
    chatArr.value.push(userlist)
    getgeneration({prompt:cont}).then(res => {
        disabled.value = false;
        let data = res;
        ailist = {
            role: 'ai鸭',
            cont: data.output.text
        }
        chatArr.value.push(ailist)
        console.log(res);
    }, err => {
        console.log(err);
        alert(err);
        disabled.value = false;
    })
}
const cleadlog = () => {
    localStorage.removeItem('chatlog');
    chatArr.value = '';
}
</script>
<style lang="scss">

.chatBox{
    width: 500px;
    height:400px;
    background: #fff;
    border-radius: 15px;
}
.chatBox_title{
    width: 100%;
    height: 5vh;
    background: rgb(0, 0, 0,0.5);
    border-radius: 15px 15px 0 0 ;
    padding-left: 0.5rem;  
    padding-right: 0.5rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.chatBox_title-left{
    line-height: 5vh;
}
.chatBox_title-right{
    width: 1.6rem;
    height: 3vh;
    line-height: 3vh;
    color:  rgb(0, 153, 255);
    margin-top: 1vh;
    text-align: center;
    background: #fff;
    border-radius: 15px;
}
.chatBox_cont{
    width: 100%;
    height: 365px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    background: #dcdcdc;
    padding: 0  0.5rem 0 0.5rem;
    box-sizing: border-box;
    
}
.chatBox_cont-ps{
    width: 100%;
    text-align: center;
    bottom: 0.5rem;
    position: absolute;
    font-size: 1rem;
    color: aqua;
}
.chatBox_cont-ai{
    width: 100%;

}
.chatBox_cont-user{
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-end;

}
.user_icon{
    display: flex;
    flex-flow: row nowrap;
    margin-top: 0.2rem;
}
.user_icon_img img{
    width: 1rem;
    height: 1rem;
    border-radius: 30px;
    
}
.user_icon_name{
    font-size: 1.5rem;
    line-height: 1rem;
    margin-left: 0.2rem;
}
.uesr_cont{
    font-size: 1rem;
    margin-top: 0.2rem;
}
.chatBox_cont-bt{
    width: 50px;
    height: 30px;
    line-height: 30px;
    background: red;
    border-radius: 15px;
    text-align: center;
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 20;
}
.chatBox_input{
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.chatBox_input_left{
    width: 80%;
    height: 5vh;
    border: 1px solid rgb(0, 153, 255);
    border-radius: 15px;
}
.chatBox_input_left:focus{
    background: #dcdcdc;
}
.chatBox_input_left_input{
    width: 90%;
    margin-left: 5%;
    line-height: 5vh;
    border: none;
    background: none;
    font-size: 0.5rem;
}
.chatBox_input_left_input:focus{
    outline: none;
}
.chatBox_input_right{
    width: 10%;
    text-align: center;
    height: 5vh;
    line-height: 5vh;
    border: 1px solid #000;
    background: #dcdcdc;
    border-radius: 15px;
    
}
.chatBox_input_right1{
    width: 10%;
    text-align: center;
    height: 5vh;
    line-height: 5vh;
    border: 1px solid rgb(0, 153, 255);
    color: rgb(0, 153, 255);
    border-radius: 15px;
}
.chatBox_ps{
    font-size: 1rem;
    margin-top: 0.5rem;
    width: 5rem;
    margin-left: 8rem;
    color: rgb(0, 153, 255);
    white-space: nowrap;
    overflow: hidden;
    -webkit-animation: moves 1s ease infinite;
    animation: moves 2s ease infinite;
}
@keyframes moves{
    0%{
        width: 2.8rem;
    }
    25%{
        width: 3.5rem;
    }
    50%{
        width: 4rem;
    }
    75%{
        width: 4.5rem;
    }
    100%{
        width: 5rem;
    }
}

@media screen and (max-width: 480px) {
    .chatBox{
        width: 300px;
        height:300px;
        background: #fff;
        border-radius: 15px;
    } 
    .chatBox_cont{
    width: 100%;
    height: 265px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    background: #dcdcdc;
    padding: 0  0.5rem 0 0.5rem;
    box-sizing: border-box;
    
    }
}
</style>