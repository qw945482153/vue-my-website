import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
// import {resolve} from 'path'
// import { path } from 'path'
const isdev = process.env.NODE_ENV ==='development'

// https://vitejs.dev/config/
export default defineConfig(
  ({command,mode,ssrBuild})=>{
    if(command=='serve'){
      //dev
      return{
        define:{
          IS_DEV:isdev
        },//定义全局常量替换方式。方式有两种其一
        publicDir: "public",//静态资源服务的文件夹 值为false则关闭该功能
        base:"./",//公共基础路径
        mode:'development',//'development' 用于开发，'production' 用于构建
        plugins: [vue()],//插件
        cacheDir:'node_modules/.vite',//缓存文件的目录 默认node_modules/.vite
        build:{//构建选项
          target:'modules',//默认 modules   游览器兼容性  'modules'，这是指 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。 特殊值是 “esnext” —— 即假设有原生动态导入支持，并且将会转译得尽可能小
          polyfillModulePreload:{//polyfill 预加载自动注入  { polyfill: false }禁用
            resolveDependencies: (filename, deps, { hostId, hostType }) => {
              return deps.filter(condition)
            }
          },
          outDir:'dist',//打包目录 默认根目录开始 默认： dist
          assestsDir:'assets',//公共目录存放路径 默认: assets
          cssCodeSplit:true,//是否拆开css代码 默认true
          sourcemap:false,//是否生成source map文件 
          rollupOptions:{
            //多页面开发模式
            input:{
              main:path.resolve(__dirname,'index.html')
            }
          },
         
        },
        resolve:{//文件路径配置
          alias:{
            '@':path.resolve('./src')
          }
        },
        server:{//服务器
          host:'0.0.0.0',//监听地址设置为 0.0.0.0 或者 true 将监听所有地址
          open:true,//游览器自启动
          cors:true,//是否跨域
          post:5000,//开发端口
          strictPort:true,//端口被占用则退出 不换端口
          https:false,//启用 TLS + HTTP/2,https.createServer() 的 选项对象 //process.env.BROWSER配置启动环境游览器
          proxy:{
            '/foo':'http://localhost:3000',//字符串简单写法
            // '/api':{
            //   target:'https://rockcelltech.top/api/',//选项写法
            //   changeOrigin:true,//修改头部Origin原始值
            //   rewrite:(path)=>path.replace(/^\/api/,'')//重写
            // },
            '/socket.io': {//代理websocket
              target: 'ws://localhost:5000',
              ws: true
            }
          },
          headers:"",//指定相应服务器头部
          watch:{},//对 .git/ 和 node_modules/ 目录的监听 例子 ignored: ['!**/node_modules/your-package-name/**']


        },
        css:{//可通过下载指定less插件直接main.js引入
          // postcss:[],//内联的 PostCSS 配置
          preprocessorOptions:{//传递给 CSS 预处理器的选项。文件扩展名用作选项的键
            scss: {
              additionalData: '@import "./src/styles/style.scss";'
            }
            // styl: {
            //   additionalData: `$injectedColor ?= orange`
            // }
          }

        },
        esbuild:{//esbuild转换器

        },
        //开发时
        preview:{//预览选项 打包后查看效果
            host:true , //为开发服务器指定 ip 地址 true全部
            port:'4000',//端口号
            // proxy:{
            //   '/api':{
            //     target:'https://rockcelltech.top/api/',
            //     changeOrigin:true,
            //     ws:true,
            //     rewrite:(path)=>path.replace(/^\/api/,'')
            //   }
            // }
        },
        optimizeDeps:{//依赖优化选项

        },
        //进阶基础路径选项 多种路径部署公共文件
        experimental:{
          //hostType:js,html,css
          renderBuiltUrl(filename,{hostType,type,hostId}){
            if (type === 'public') {
              return 'http://localhost:4000/' + filename
            }
            else if (path.extname(hostId) === '.js') {
              return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
            }
            else {
              return 'http://cdn.localhost:4000/assets/' + filename
            }
          }
        }
      } 
    }
    else{
      //build
      return{
        plugins: [vue()],
        resolve:{
          alias:{
            '@':path.resolve('./src'),
          }
        },
        server:{
          open:true,
          cors:true,
          post:5000
        }
      }
    }
  }
  )
