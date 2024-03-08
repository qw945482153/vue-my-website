<template>
   <div class="user-input">
        <div class='user-input-label'>
          <div class='user-emoji'>
            <span class='user-emoji-icon' @click.stop="showEmojiView"></span>
            <div class="fade" v-if="state.showEmoji">
              <div id="emojiView" class='user-emoji-list' @click="selectEmoji($event)">
                <span  v-for="(item, index) in EMOJI_LIST" :key="index">
                {{ item }}</span>
              </div>
            </div>
          </div>
          <div class='user-input-enter'>
            <textarea 
                id="commentText"
              v-model="conmmentText"
              placeholder="Leave a comment" 
              :style="{height: state.currentHeight + 'px'}"
              @keyup="textAutoSize($event)"
            />
          </div>
        </div>
      </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { isMobile } from '../../util/isMobile';
const EMOJI_LIST = [
"😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","🫠","😉","😊","😇","🥰","😍","🤩","😘","😗","☺️","😚","😙","🥲","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🫢","🫣","🤫","🤔","🫡","🤐","🤨","😐","😑","😶","🫥","😶‍🌫️","😏","😒","🙄","😬","😮‍💨","❤️","💥","💢","💯","💫","💣","🥹","😩"]
const getLineSize = ele => {
    const {fontSize, paddingLeft, paddingRight} = getComputedStyle(ele);
    const width = ele.offsetWidth - parseInt(paddingLeft) - parseInt(paddingRight);
    return (2*width / parseInt(fontSize));
}
let conmmentText = ref("")
let emit = defineEmits();
const getRealLine = (str, size) => {
    let len = 1;
    let index = 0;
    str = str.replace(/[^\x00-\xff]/g,"01")
    for(let i = 0; i < str.length; i++,index++) { 
        if(index > size){
            index = 0;
            len++
        }
        if(str.charCodeAt(i) == 10){
            index=0;
            len++
        }
    }
    return len;
}
let state = ref({
    showEmoji: false,
    currentHeight:45,
    currentLine:1
})
let $lineSize = "";
onMounted(() => {
    document.body.addEventListener('click',closeEmojiView);
}
)
onUnmounted(() => {
    document.body.removeEventListener('click',closeEmojiView)
})
function emptyValue(){
    conmmentText.value="";
    state.value.currentHeight = 45;
}

function selectEmoji(e){
    if( e.target.tagName === 'SPAN'){
        conmmentText.value += e.target.innerText;
        state.value.showEmoji = false;
        emit("change",conmmentText.value);
    }
}
function showEmojiView(){
    state.value.showEmoji =  true;
}
function closeEmojiView(e){
    const target = document.querySelector('#emojiView');
    if(target && target.contains(e.target))
    {
        return
    }
    state.value.showEmoji = false;
}
function textAutoSize(e) {
    const element = document.querySelector('#commentText');
    const lineSize = $lineSize || getLineSize(element)
    const realLine = getRealLine(element.value, lineSize) 
    const lineHeight = 22 
    $lineSize = lineSize
    state.value.currentHeight = 45 + lineHeight*(realLine - 1);
    emit("change",conmmentText.value);
}
</script>
<style lang="scss">
$color_main:#ffd03f;
    .user {
  &-input {
    width: 100%;
    &-label {
      display: block;
    }
    &-enter {
      margin-left: 50px;
      textarea {
        border-radius: 20px;
        transition: all .6s;
        display: block;
        box-sizing: border-box;
        width: 100%;
        line-height: 22px;
        height: 45px;
        padding: 10px 15px;
        background: #f7f7f7;
        color: #555;
        font-size: 14px;
        outline: none;
        border: 1px solid #d6d7dc;
        &:focus {
          border-color: $color_main;
          background-color: #fff0c2
        }
      }
    }
  }
  &-emoji {
    width: 46px;
    position: relative;
    float: left;
    &-icon {
      display: block;
      width: 40px;
      height: 40px;
      margin-top: 2px;
      background: url('../../assets/about/happy.png') no-repeat center;
      background-size: contain;
      cursor: pointer;
    }
    &-list {
      width: 60vw;
      position: absolute;
      max-width: 400px;
      background: #fff;
      border: 1px solid #f7f7f7;
      box-shadow: 2px 2px 6px rgba(0,0,0,.3);
      padding: 16px;
      border-radius: 20px;
      line-height: 40px;
      font-size: 24px;
      bottom: 50px;
      span {
        display: inline-block;
        width: 30px;
        margin: 0 5px;
        text-align: center;
        cursor: pointer;
        transition: transform .05s ease-in;
        &:hover {
          transform: scale(1.3)
        }
      }
    }
  }
}

@media screen and (max-width: 375px){
  .user-emoji-list{
    line-height: 30px;
    font-size: 18px;
    span {
      width: 20px;
      margin: 0 3px
    }
  }
}

</style> 