<template>
    <div>
        <section class='reaction-box'>
            <div class='reaction-up' @click="handleReactionModify('up', upActiveItem)">
                <i></i>
                <span>{{ArticleDet.score?ArticleDet.score:0}}</span>
            </div>
            <div class='reaction-like'  @click="handleReactionModify('like', likeActiveItem)">
                <i></i>
                <span>{{ArticleDet.read_volume?ArticleDet.read_volume:0}}</span>
            </div>
        </section>
        <section class='comment-form'>
            <CommentInput @change="changecont" ref="commentInput" />
            <button class='comment-form-submit' @click='postComment'>Comment</button>
        </section>
        <section class='comment-view'>
            <Comment  v-if="state.comments.length>0"  :data="state.comments"  />
            <div v-else style="textAlign: center ; color: #ccc;">这里空空如也～</div>
        </section>
        <div  class="fade" v-if="islogin">
                <Pop :unmove='true' @onclose="toggleShow" title="登陆" type="white" >
                    <SginIn :user='user' @onclose="toggleShow" :isErro='props.isErro'
                        :setUser='props.setUser' />
                </Pop>
        </div>
        <!-- <Model ref="model" type={this.state.type} text={this.state.text} /> -->
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { getComment, addComment, addArticlesRead, addArticlesLove } from '../../util/api/api';
import CommentInput from './input.vue';
import Comment from './Comment.vue'
import Pop from '../../components/windo/windo.vue';
import SginIn from '../../components/sginin/sginin.vue'
let props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})
let state = ref({
    reactions: [],
    comments: [],
    type: [],
    text: '',
    commentLoading: false,
})
let islogin = ref(false);
let cont = ref("")
let ArticleDet = ref("")
let getReactionsCancel = () => { };
let getCommentsCancel = () => { };
let token = ref("");
let user = ref("");
if(localStorage.getItem('userInfo')){
    let b = localStorage.getItem('userInfo');
    user.value = JSON.parse(b);
    token.value = localStorage.getItem('xxxtoken');
}
watch(props, (newValue, oldValue) => {
    ArticleDet.value = newValue.data;
    getArticleComments(newValue.data);
})
onMounted(() => {
    
})
function toggleShow(){
    islogin.value = false;
    let b = localStorage.getItem('userInfo');
    user.value = JSON.parse(b);
    token.value = localStorage.getItem('xxxtoken');
}
// 获取留言
function getArticleComments(dataInfo) {
    getCommentsCancel()
    getComment(dataInfo.id).then(res => {
        state.value.comments = res;
    })
}
function postComment() {
    const text = cont.value
    const id = ArticleDet.value.id;
    if(!token.value){
        return islogin.value = true;
    }
    if (state.value.commentLoading) {
        return
    }

    // if (!this.props.userInfo.id) {
    //   this.props.showLogin()
    //   return
    // }

    if (!text.trim().length) {
        alert("输入为空！！");
        return
    }
    state.value.commentLoading = true;
    let data = {
        article_id: id,
        comment_img: JSON.stringify([]),
        content:  JSON.stringify(text),
        parent_avatar: '',
        parent_name: "测试"
    }
    addComment(data).then(res => {
        if (res) {
            alert("留言成功!")
            state.value.commentLoading = false;
            getArticleComments(ArticleDet.value);
        }
    }, err => {
        alert("留言失败:" + err);
        state.value.commentLoading = false;
    })
}
function changecont(e){
    cont.value = e;
}
function getArticleReactions(dataInfo) {
    getReactionsCancel()
    // const { data } =  Axios({ 
    //   url: `${dataInfo.url}/reactions?time=${Date.now()}`,
    //   cancelToken: new CancelToken((c) => {
    //     this.getReactionsCancel = c;
    //   }),
    //   headers: {
    //     'Accept': 'application/vnd.github.squirrel-girl-preview+json'
    //   }
    // })
    // this.setState({ reactions: data || [] })
}
function handleReactionModify(type, item) {
    if(type == 'like'){
        addArticlesRead(ArticleDet.value.id).then(res=>{
            ArticleDet.value.read_volume = Number(ArticleDet.value.read_volume) + 1;
        })
    }
    else{
        addArticlesLove(ArticleDet.value.id).then( res => {
            ArticleDet.value.score = Number(ArticleDet.value.score) + 1;
        })
    }
    // if (!this.props.userInfo.id) {
    //   this.props.showLogin()
    //   return
    // }
    // if (item) {
    //  await Axios({
    //     url: `https://api.github.com/reactions/${item.id}`,
    //     method: 'delete',
    //     headers: {
    //       'Accept': 'application/vnd.github.squirrel-girl-preview+json'
    //     }
    //   })
    // } else {
    //   await Axios({
    //     url: `${this.props.data.url}/reactions`,
    //     method: 'post',
    //     data: { content: type === 'like' ? 'heart' : '+1' },
    //     headers: {
    //       'Accept': 'application/vnd.github.squirrel-girl-preview+json'
    //     }
    //   })
    // }
    // this.getArticleReactions(this.props.data)
  }
</script>
<style lang="scss">
$color_main:#ffd03f;
$color_pink:#ff98c6;
$art_font: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
.reaction {
    &-box {
        margin: 40px auto;
        width: 260px;

        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }

    &-up,
    &-like {
        box-sizing: border-box;
        width: 118px;
        height: 72px;
        padding-top: 14px;
        border-radius: 50px;
        cursor: pointer;
        text-align: center;
        background-color: #f7f7f7;

        i {
            display: block;
            width: 100%;
            height: 30px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: auto 100%;
        }

        span {
            font-size: 12px;
            font-weight: bolder;
            margin-top: 10px;
            color: #666;
        }
    }

    &-up {
        float: left;

        &:hover {
            opacity: 0.8;
        }

        i {
            background-image: url('../../assets/img/dianzan.png')
        }

        &-active {
            background-color: $color_main;

            i {
                background-image: url('../../assets/img/dianzan_1.png')
            }

            span {
                color: #fff
            }
        }
    }

    &-like {
        float: right;

        &:hover {
            opacity: 0.8;
        }

        i {
            background-image: url('../../assets/img/aixin.png')
        }

        &-active {
            background-color: $color_pink;

            i {
                background-image: url('../../assets/img/aixin_1.png')
            }

            span {
                color: #fff
            }
        }
    }
}

.comment {
    &-form {
        width: 100%;
        padding-top: 35px;
        border-top: 1px solid #eaeaea;

        &-submit {
            display: block;
            width: 140px;
            height: 45px;
            box-sizing: border-box;
            background-color: #f95f56;
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            border-radius: 24px;
            margin-left: 50px;
            margin-top: 14px;
            position: relative;
        }

        &-loading {
            opacity: 0.5;
            color: #f95f56;

            &::before {
                content: '';
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                border: 3px solid #fff;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                width: 8px;
                height: 8px;
                top: 50%;
                margin-top: -4px;
                left: 50%;
                margin-left: -15px;
                background-color: #f95f56;
                z-index: 2;
                animation: submitLoading .4s linear infinite running;
                transform-origin: 15px center
            }
        }
    }

    &-view {
        margin-top: 40px;
    }

    &-item {
        width: 100%;
        margin: 18px 0;
        font-family: $art_font;

        &-img {
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f7f7f7;
            background-position: center;
            background-size: contain;
            float: left;
        }

        &-box {
            margin-left: 50px;
        }

        &-context {
            border-radius: 20px;
            background-color: #f7f7f7;
            padding: 15px 15px 10px 15px;
            box-sizing: border-box;

            h3 {
                font-size: 16px;
                font-weight: bold;
                color: #111;

                span {
                    font-size: 12px;
                    color: #ccc;
                    margin-left: 12px;
                    font-weight: 100
                }
            }

            article {
                font-size: 14px;
                line-height: 1.5;
                margin-top: 6px;
                color: #666;
                word-break: break-all
            }
        }
    }
}

@media screen and (max-width: 375px) {
    .reaction-box {
        transform-origin: center;
        transform: scale(0.8)
    }
}

@keyframes submitLoading {
    0% {
        transform: rotate(0deg)
    }

    50% {
        transform: rotate(180deg)
    }

    100% {
        transform: rotate(360deg)
    }
}</style>