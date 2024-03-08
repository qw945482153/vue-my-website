<template>
    <main class="page  scroll">
        <div style='height:auto;padding-bottom:6rem;' class="app-center">
            <!-- <ListCompon :style={type!=="code"} title="Desgin" figures={this.state.desginFigu} shows={this.show.bind(this)}  close={this.close.bind(this)}/>
          <ListCompon style={type==="code"} title="Code" figures={this.state.codeFigu} shows={this.show.bind(this)}  close={this.close.bind(this)}/> -->
            <div style="z-index:10" class='codeBox'>
                <span>Desgin</span>
                <div class='figureBox'>
                    <Icon></Icon>
                    <!-- {this.props.figures.map((fig,i) => < key={i} show={()=>this.props.shows(fig)}
                        close = {this.props.close}
                        {...fig}/>)} -->
                </div>
                <hr align='center' width='100%' color='#1e1e1e' size="1" />
            </div>
            <div style="z-index:20" class='codeBox'>
                <span>Code</span>
                <div class='figureBox'>
                    <div class="figureBox-list" @click="goSnack(index)" v-for="(item,index) in codeArr" :key="index">
                        <img class="figureBox-list-img" :src="item.img"/>
                        <div class="figureBox-list-title">{{item.title}}</div>
                    </div>
                </div>
                <hr align='center' width='100%' color='#1e1e1e' size="1" />
            </div>
            <div @click='toAbout' class='more'>
                <span class='moreIcon'>
                    <i></i>
                </span>
                <span class="needsclick">VIEW MORE</span>
            </div>
            <Switch v-if="state.switchin" type="enter" @tagchange='switchOut' />
           
        </div>
        <windo type="pink"  :title="title" :noClose="false" @onclose="onclose" v-if="isshow">
                <greedy-snake v-if="current == 0"></greedy-snake>
                <gameelse v-if="current==1"></gameelse>
                <aichat v-if="current==2"></aichat>
        </windo>
    </main>
</template>
<script setup>
import Switch from '../../components/SwitchAnimate.vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import greedySnake from '../smallgame/greedysnake.vue'
import { gameImg } from '../../components/imgurls';
import windo from '../../components/windo/windo.vue';
import gameelse from '../smallgame/gameelse.vue'
import aichat from '../../components/aichat/aichat.vue'
// const ws = new WebSocket('ws://localhost:3040');

// ws.onopen = () =>{
//     console.log("连接成功");
//     ws.send("我是客户端发送的消息");
// }
// ws.onmessage = (event) => {
//     console.log(JSON.parse(event.data));
// }
let codeArr = ref([
    {
        title:'贪吃蛇',
        img:gameImg.snake
    },
    {
        title:'2048',
        img:gameImg.g2048
    },
    {
        title:'Ai聊天',
        img:gameImg.ai
    }
])

let current = ref(-1)
let router = new useRouter();
let isshow = ref(false);
let title = ref("");
let state = ref(
    {
        desginFigu: [],
        codeFigu: [],
        switchin: true
    }
)
function switchOut() {
    state.value.switchin = false;
}
function toAbout() {
    // console.log("执行了么")
    router.push('/about')
}
function goSnack(e){
    title.value = codeArr.value[e].title
    current.value = e;
    isshow.value = true;
}
function onclose(){
    isshow.value = false;
    title.value = " ";
    current.value = -1;
}
</script>
<style lang="scss">
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
@mixin content {
    content: '';
    position: absolute;
    display: block;
}

.scroll {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100vh;
    width: 100vw;
}

.figureBox {
    position: relative;
    z-index: 800;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;

    &>div {
        margin-right: 60px;
    }
    .figureBox-list{
            color: #fff;
            .figureBox-list-img{
                 width:30px;
                 height: 30px;
                 padding: 10px;
             }
             .figureBox-list-title{
                width: 100%;
                text-align: center;
             }
    }
    .figureBox-list:hover{
        animation: tranbig 2s;
    }
}
@keyframes tranbig {
    25%{
        transform: scale(0.9);
    }
    50%{
        transform: scale(1);
    }
    75%{
        transform: scale(0.9);
    }
    100%{
        transform: scale(1);
    }
}
.codeBox {
    padding-top: 36px;
    position: relative;
    z-index: 10;

    &>span {
        font-size: 1.8rem;
        padding: 4px 14px;
        letter-spacing: 4px;
        color: #fff;
        font-weight: 400;
        margin-bottom: 10px;
        background-color: #101010
    }

    &>hr {
        transform: scaleX(1.2);
        margin-top: 30px
    }
}

.more {
    width: 180px;
    margin-top: 40px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: bold;
    line-height: 46px;
    transition: color .1s ease-out;
    cursor: pointer;

    .moreIcon {
        display: block;
        background-color: #8e89ec;
        position: relative;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        float: left;
        margin-right: 12px;

        &::before {
            @include content();
            width: 40px;
            height: 40px;
            top: 3px;
            left: 3px;
            background-color: #4456a7;
            border-radius: 50%;
            transform: scale(1);
            transition: transform .1s ease-out;
        }

        i {
            position: absolute;

            &::before,
            &::after {
                @include content();
                width: 14px;
                height: 4px;
                border-radius: 2px;
                background-color: #fbd214;
                left: 18px;
                transition: background-color .1s ease-out;
            }

            &::before {
                transform: rotate(45deg);
                top: 17px;
            }

            &::after {
                transform: rotate(-45deg);
                top: 25px;
            }
        }
    }

    &:hover {
        color: rgba(255, 255, 255, 1);

        .moreIcon {

            &::before {
                transform: scale(0);
            }

            i::before,
            i::after {
                background-color: #fff
            }
        }
    }
}


@media screen and (max-width: 768px) {
    .figureBox>div {
        margin-right: 20px
    }
}

@media screen and (max-width: 480px) {
    .figureBox>div {
        margin-right: 0
    }

    .scroll {
        -webkit-overflow-scrolling: touch;
    }

    .more {
        margin-bottom: 60px;
    }
}
</style>