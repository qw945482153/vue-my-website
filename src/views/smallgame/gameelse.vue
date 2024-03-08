<template>
    <div class="gameelse">
        <div class="gameelse-title">
            2048
        </div>
        <div class="gameelse-subtitle">
            历史分数:0
        </div>
        <div class="ganmelse-box">
            <div class="gamelse-box-top" @click="changdirection('up')">上</div>
            <div class="gamelse-box-center">
                <div class="gamelse-box-center-left" @click="changdirection('left')">
                    左
                </div>
                <div class="gamelse-box-center-cont">
                    <div class="gamelse-box-center-cont-num" v-for="(item, index) in numlist" :key="index">
                        {{ item.num }}
                    </div>
                </div>
                <div class="gamelse-box-center-right" @click="changdirection('right')">
                    右
                </div>
            </div>
            <div class="gamelse-box-bottom" @click="changdirection('down')">下</div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let direction = ref('');
let numlist = ref([{
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}, {
    num: '',
}])
onMounted(() => {
    init();
})
function randNum() {
    let a = Math.floor(Math.random() * 16)
    if (numlist.value[a].num != '') {
        return randNum()
    }
    return a;
}
function findtwonum() {
    let num = 0;
    numlist.value.forEach(arr => {
        if (arr.num == 2) {
            num = num + 1;
        }
    })
    return num;
}
function dealList(){
    numlist.value.forEach(arr => {
        arr.num = '';
    })
}
function init() {
    let num = findtwonum();
    let len = 0;
    for(let i=0;i<numlist.value.length;i++){
        if(numlist.value[i].num){
            len = len + 1;
        }
    }
    if(len>=15){
        alert("游戏结束!");
        dealList()
        init();
        return false
    }
    let a = randNum();
    if (num > 4) {
        numlist.value[a].num = 4;
    } else {
        numlist.value[a].num = 2;
    }
}
function changdirection(e) {
    direction.value = e;
    determine();
}
function determine() {
    switch (direction.value) {
        case 'up':
            dealup(0)
            dealup(1)
            dealup(2)
            dealup(3)
            break;
        case 'down':
            dealdown(0)
            dealdown(1)
            dealdown(2)
            dealdown(3)
            break;
        case 'left':
            dealleft(0);
            dealleft(4);
            dealleft(8);
            dealleft(12);
            break;
        case 'right':
            dealright(0);
            dealright(4);
            dealright(8);
            dealright(12);
            break;
    }
    init();
}
function dealleft(e){
    let arr = [];
    let b_cp  = numlist.value
    let a_num = 0;
    let b_num = 0;
    for(let i=e;i<e+4;i++){
        if(b_cp[i].num){
            for(let j=i+1;j<e+4;j++){
                if(b_cp[i].num==b_cp[j].num){
                    b_cp[i].num = b_cp[i].num + b_cp[j].num;
                    b_cp[j].num = '';
                    a_num = a_num+1;
                    break;
                }
            }
        }
    }

    for(let i=e;i<e+4;i++){
        if(b_cp[i].num){   
            if(i!=e){
                if(arr.length>0){
                    b_cp[arr[0]].num=b_cp[i].num;
                    b_cp[i].num='';
                    arr.push(i);
                    arr.shift();
                    b_num = b_num+1;
                }
            }
        }
        else{
            arr.push(i)
        }
    }
    
    if(b_num!=0||a_num!==0){
        numlist.value = b_cp;
    }
}
function dealright(e){
    let b_cp  = numlist.value
    let a_num = 0;
    let b_num = 0;
    let arr = [];
    for(let i=e+3;i>=e;i--){
        if(b_cp[i].num){
            for(let j=i-1;j>=e;j--){
                if(b_cp[i].num==b_cp[j].num){
                    b_cp[i].num = b_cp[i].num + b_cp[j].num;
                    b_cp[j].num = '';
                    a_num = a_num + 1;
                        break;
                }
            }
        }
    }



    for(let i=e+3;i>=e;i--){
        if(b_cp[i].num){   
            if(i!=e+3){
                if(arr.length>0){
                    b_cp[arr[0]].num=b_cp[i].num;
                    b_cp[i].num='';
                    arr.push(i);
                    arr.shift();
                    b_num = b_num + 1;
                }
            }
        }
        else{
            arr.push(i)
        }
    }

    if(b_num!=0||a_num!==0){
        numlist.value = b_cp;
    }
}
function dealdown(e){
    let  arr = [];
    let b_cp  = numlist.value
    let a_num = 0;
    let b_num = 0;
    let b = 15 - e;
    // 判断相同值相加
    for(let i = b; i >= 0; i = i-4){
        if(b_cp[i].num){
            for(let j = i - 4 ; j >= 0; j = j-4){
                if(b_cp[j].num){
                    if(b_cp[i].num == b_cp[j].num){
                        b_cp[i].num = b_cp[i].num + b_cp[j].num;
                        b_cp[j].num = '';
                        a_num = a_num + 1;
                        break;
                    }
                }
            }
        }
       
    }


    for(let i = b; i >= 0; i = i-4){
        if(b_cp[i].num){   
            if(i!=b){
                if(arr.length>0){
                    b_cp[arr[0]].num=b_cp[i].num;
                    b_cp[i].num='';
                    arr.push(i);
                    arr.shift();
                    b_num = b_num + 1;
                }
            }
        }
        else{
            arr.push(i)
        }
    }
    if(b_num!=0||a_num!==0){
        numlist.value = b_cp;
    }
}
function dealup(e) {
    let index = 0;
    let arr = [];
    let b_cp  = numlist.value
    let a_num = 0;
    let b_num = 0;

    // 判断相同值相加
    for(let i = e; i< b_cp.length;i = i+4){
        if(b_cp[i].num){
            for(let j = i +4 ;j<b_cp.length;j=j+4){
                if(b_cp[j].num){
                    if(b_cp[i].num==b_cp[j].num){
                        b_cp[i].num = b_cp[i].num + b_cp[j].num;
                        b_cp[j].num = '';
                        break;
                    }
                }
            }
        }
       
    }



    // 整理值
    for(let i = e; i < b_cp.length; i = i+4){
        if(b_cp[i].num){   
            if(i!=0){
                if(arr.length>0){
                    b_cp[arr[0]].num=b_cp[i].num;
                    b_cp[i].num='';
                    arr.push(i);
                    arr.shift();
                }
            }
        }
        else{
            arr.push(i)
        }
    }
    if(b_num!=0||a_num!==0){
        numlist.value = b_cp;
    }
}

</script>
<style lang="scss">
.gameelse {
    width: 500px;
    height: 500px;

    .gameelse-title {
        width: 100%;
        text-align: center;
        font-size: 27px;
        font-weight: bold;
    }

    .gameelse-subtitle {
        width: 100%;
        text-align: center;
        font-size: 22px;
    }

    .ganmelse-box {
        width: 300px;
        height: 300px;
        margin-left: 50%;
        transform: translateX(-50%);

        .gamelse-box-top {
            width: 300px;
            height: 50px;
            line-height: 50px;
            text-align: center;
        }

        .gamelse-box-center {
            width: 300px;
            height: 200px;
            display: flex;
            flex-flow: row nowrap;

            .gamelse-box-center-left {
                width: 50px;
                height: 200px;
                line-height: 200px;
                text-align: center;
            }

            .gamelse-box-center-right {
                width: 50px;
                height: 200px;
                line-height: 200px;
                text-align: center;
            }

            .gamelse-box-center-cont {
                width: 200px;
                height: 200px;
                display: flex;
                flex-flow: row wrap;

                .gamelse-box-center-cont-num {
                    box-sizing: border-box;
                    width: 50px;
                    height: 50px;
                    border: 0.5px solid #000;
                    text-align: center;
                    line-height: 50px;
                }
            }
        }

        .gamelse-box-bottom {
            width: 300px;
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
    }
}</style>