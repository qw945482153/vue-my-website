<template>
    <div class="header">
        <div class="app-center">
            <nav ref="test" class="nav">
                <span><img src="https://rockcelltech.top/assets/log.92dfa51d.png" alt="" /></span>
                <a v-for="(item, index) in nav" :key="index" :class="[index == now ? 'nav-index' : '']"
                    @click="toLink(item, $event)">
                    {{ item.text }}
                </a>
            </nav>
            <div class="times">
                <a target="_blank" href="https://github.com/qw945482153"><img src="../../../public/img/github.4a160e3c.png" alt="" /></a>
                <time>{{ time }}</time>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const routes = useRoute();
const router = useRouter();
let time = ref(TimeNow())
const nav = ref(
    [
        { indent: true, text: 'HOME', herf: '/' },
        { indent: false, text: 'BLOG', herf: '/blog' },
        { indent: false, text: 'WORK', herf: '/work' },
        { indent: false, text: 'ABOUT', herf: '/about' }
    ]
)
let setHistory = null;
let now = ref(0) //当前index，避免重复点击

//监听当前index

watch(routes, (newValue, oldValue) => {
    for (let i = 0; i < nav.value.length; i++) {
        if (oldValue.fullPath == nav.value[i].herf && i != now.value) {
            now.value = i;
            break;
        }
    }
})

onMounted(() => {
    setInterval(() => {
        timeRe()
    }, 1000)
})
const timeRe = () => {
    time.value = TimeNow();
}
const toLink = (n, event) => {
    // if(n.text==='BLOG')return window.location.href='http://blog.vanoc.top'
    const index = nav.value.indexOf(n)
    if (index === now.value) return;
    now.value = index;
    // this.props.isRoute(true);
    setHistory = setTimeout(() => {
        router.push(nav.value[index].herf)
    }, 1000)
}
function TimeNow() {
    const time = new Date()
    return `${PollyTime(time.getHours())}:${PollyTime(time.getMinutes())}:${PollyTime(time.getSeconds())}`
}
function PollyTime(t) {
    let _t = +t < 10 ? `0${t}` : t
    return _t
}
</script>
<style lang="scss">
$color_black: #111111;
$b_border:1px solid #111111;
$color_main:#ffd03f;
.header {
    width: 100%;
    background-color: #fff;
    border-bottom: $b_border;
    height: 36px;
}

@mixin box {
    box-sizing: border-box;
}

@mixin mainBox {
    width: calc(100% - 120px);
    margin: 0 auto;
    position: relative;
}

@mixin after ($both) {
    content: '';
    display: block;

    @if $both ==both {
        clear: both;
    }
}

// .app-center {
//     @include mainBox();
// }

.nav {
    &::after {
        @include after(both)
    }
}

.times {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;

    a {
        display: block;
        padding: 7px 10px;
        float: left;
    }

    time {
        float: left;
        display: block;
        font-size: 16px;
        font-weight: bold;
        line-height: 38px;
    }
}


.nav>span {
    display: block;
    float: left;
    font-weight: bolder;
    color: $color_black;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
}
.nav>span img {
    width: 56px;
    height: 40px;
    top: 0 !important;
}
.nav span~a {
    display: block;
    float: left;
    font-weight: bolder;
    color: $color_black;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    padding: 0 10px;
    cursor: pointer;
    line-height: 36px;
    font-size: 1rem;

    &::after {
        @include after(t);
        // @include center(28px, 28px);
        @include box();
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 3px solid $color_main;
        background-color: #fff;
        z-index: -1;
        transform: scale(0);
        transition: transform 0.15s cubic-bezier(.18, 1.29, .89, 1.24);
    }

    &:hover {
        color: #111111;
        text-decoration: none;

        &::after {
            transform: scale(1)
        }
    }
}
.nav span~a{
  display: block;
  float: left;
  font-weight: bolder;
  color: $color_black;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding: 0 10px;
  cursor: pointer;
  line-height: 36px;
  font-size: 1rem;
  &::after{
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -14px;
    margin-top: -14px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 3px solid #ffd03f;
    background-color: #fff;
    z-index: -1;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    -webkit-transition: -webkit-transform 0.15s cubic-bezier(0.18, 1.29, 0.89, 1.24);
    transition: -webkit-transform 0.15s cubic-bezier(0.18, 1.29, 0.89, 1.24);
    -o-transition: transform 0.15s cubic-bezier(0.18, 1.29, 0.89, 1.24);
    transition: transform 0.15s cubic-bezier(0.18, 1.29, 0.89, 1.24);
    transition: transform 0.15s cubic-bezier(0.18, 1.29, 0.89, 1.24), -webkit-transform 0.15s cubic-bezier(0.18, 1.29, 0.89, 1.24);
  }
  &:hover{
    color: #111111;
    text-decoration: none;
    &::after{
      transform: scale(1)
    }
  }
}
.nav a.nav-index::after {
    background-color: $color_main;
    transition: none;
    transform: scale(1);
    animation: indexs 0.15s ease-out forwards;
}</style>
