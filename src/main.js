import { createApp } from 'vue'
import pinia from './store/index.js'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import DOMPurify from 'dompurify';
let app = createApp(App);
app.use(router)
app.use(pinia)
app.directive('purify-html',{
    updated:(el, binding, vnode) => { // el元素 dom操作可读可写 binding（只读）：通过自定义指令传递的参数都在这里 vnode（只读）：Vue编译生成的虚拟节点。
        let clean = DOMPurify.sanitize(binding.value)
        // px 转成rem布局
        // clean = clean.replace(/(\d+)px/g, function(s, t) {
        //     s = s.replace('px', '');
        //     var value = parseInt(s) * 0.01; // 100px = 1rem
        //     return value + "rem"; // 0.23rem
        // }); 
        el.innerHTML = clean
    }
})
app.mount('#app')
