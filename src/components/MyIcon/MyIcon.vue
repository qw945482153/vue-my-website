<template>
    <div class="figureBox">
        <div class='figure-flex' v-for="(item,index) in state.figures" :key="index" >
          <div class="figure" @click="changeshow(index)" >
            <img :src="item.src" alt=""/>
            <div class="figcaption">{{item.text}}</div>
          </div>
        </div>
        <!-- <Icon v-for="(item,index) in state.figures" :key="index" show={this.shows.bind(this,fig)} close={this.close.bind(this)} other={this.props} {...fig} />)} -->
        <div class='figure-flex'>
          <div class="figure" @click="window.open('https://ox.bruceau.com')">
            <img :src="homeIcon.ox" alt=""/>
            <div class="figcaption">跨端</div>
          </div>
        </div>
        <div class='figure-flex'>
          <div class="figure" @click=" window.open('https://arthuryung.github.io/asciiflow/')">
            <img :src="homeIcon.asciiflow" alt=""/>
            <div class="figcaption">Ascii<br/>Flow</div>
          </div>
        </div>
        <div class='figure-flex'>
          <div class="figure" @click="window.open('https://someone.ink/')">
            <img :src="homeIcon.someone" alt=""/>
            <div class="figcaption">Someone</div>
          </div>
        </div>
        <suppug v-if="show1" @close="closeshow"></suppug>
       
    </div>
</template>
<script setup>
// import Icon from './Icon.vue';
import { homeIcon } from '../../components/imgurls';
import suppug from '../../components/suppug/suppug.vue';
import winDo from '../../components/windo/windo.vue';
import { ref, onMounted } from 'vue'
const emit = defineEmits();
let props = defineProps({
    user:{
        type:Object,
        default:{
            name:null,
            email:null
        }
    }
});
let current = ref(-1);
let state = ref({
    figures: [
    {
        src: homeIcon.sup,
        text: '点赞',
        isShow: false,
        unmove: true,
        type: 'none',
        add: {
            num: 0,
            upSup: false
        }
    },
    { src: homeIcon.readme, text: '说明', isShow: false, show:false , type: 'main' },
    { src: homeIcon.msg, text: '留言', isShow: false, show: false, type: 'wathet' },
    { src: homeIcon.setting, text: '设置', isShow: false, show: false, type: 'setting' }
    ]
});
let upload = ref(0);
let axiosUp = ref(0);
let show1 = ref(false);
onMounted(() => {
    getSups();
})
const changeshow = (e) => {
    if(e==0){
        show1.value = true;
    }else{
      emit("changecurrent",e);
    }
}
const closeshow = (e) => {
    show1.value = false;
}
// 获取点赞数
function getSups(){
  
} 
</script>
<style lang="scss" scoped>
.figureBox{
  position: absolute;
  z-index: 800;
  top: 44px;
  right: -14px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  height: 80vh;
  .figure-flex{
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    .figure{
        margin: 12px;
        max-width: 80px;
        cursor: pointer;
        .figcaption{
            text-align: center;
            color: #fff;
            font-size: 1rem;
            margin-top: 4px;
            font-family: lucida Grande,Verdana;
            -webkit-transition: -webkit-transform .3s ease-out;
            transition: -webkit-transform .3s ease-out;
            -o-transition: transform ease-out .3s;
            transition: transform .3s ease-out;
            transition: transform .3s ease-out,-webkit-transform .3s ease-out;
        }
    }
    .figure:hover{
        animation: jump_box 500ms;
    }
    @keyframes jump_box {
        25%{
            transform: translateY(10px);
        }
        50%{
            transform: translateY(0px);
        }
        75%{
            transform: translateY(10px);
        }
        100%{
            transform: translateY(0);
        }
    }
  }
}


@media screen and (max-width: 480px) {
  .figureBox{
      flex-direction: row;
      flex-wrap: wrap;
      top: 1rem;
      left: -1rem;
      height: auto;
  }
}</style>