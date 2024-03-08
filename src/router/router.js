import {createRouter,createWebHashHistory} from 'vue-router'
import { useTextStore } from "../store/modules/text"
import { isMobile } from '../util/isMobile'
// import Home from '@/views/index/index.vue'

const routes=[
    {
        path:'/',
        name:'home',
        component:() => import('@/views/home/home.vue'),
        children:[
        ]
    },
    {
        path:'/home',
        name:'pchome',
        meta:{
            title:"首页"
        },
        component:() => import('@/views/home/home.vue'),
    },
    {
        path:'/mobile',
        name:'mobilehome',
        component:() => import('@/views/iphone/home/home.vue')
    },{
        path:'/text',
        name:'text',
        component:()=>import('@/views/text/text.vue')
    },
    // {
    //     path:'/text1',
    //     name:'text1',
    //     component:()=>import('@/views/text1/text1.vue')
    // },
    {
        path:'/blog',
        name:'blog',
        mate:{
            title:"博客",
        },
        component:() => import('@/views/blog/blog.vue')
    },
    {
        path:'/work',
        name:'work',
        mate:{
            title:"工具",
        },
        component:() => import('@/views/work/work.vue')
    },
    {
        path:'/about',
        name:'about',
        mate:{
            title:"关于我",
        },
        component:() => import('@/views/about/about.vue')
    }
]

const router=createRouter({
    history:createWebHashHistory(),
    routes:routes
})

router.beforeEach((to,from,next) => {
    // console.log(to,from);
    // console.log(useTextStore().isIn);
    // console.log("前置路由手背befoEach")
    // console.log(isMobile());
    // console.log(to.fullPath);
    
    // useStaticStore.$path({
    //     isIn:true
    // })
    if(to.fullPath=='/'||to.fullPath=='/mobile'||to.fullPath=='/home'){
        if(isMobile()){
            // console.log("a")
            if(to.fullPath=='/mobile'){
                return next();
            }
            return next('/mobile')
        }else{
            if(to.fullPath=='/mobile'){
                return next('/home')
            }
            else if(to.fullPath=='/home'){
                return next();
            }
            else{
                return next('/home')
            }
            
        }
    }
    useTextStore().$patch({
        isIn:true
    })
    if( typeof next == 'function'){
        next();
    }
})

router.afterEach((to,from,next)=>{
    // console.log(to,from);
    // console.log(useTextStore().isIn);
    useTextStore().$patch({
        isIn:false
    })
    // console.log("后置路由守备")
    if( typeof next == 'function'){
        next();
    }
    
})

export default router