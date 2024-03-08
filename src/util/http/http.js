import axios from 'axios'


const server = axios.create({
    baseURL:'https://rockcelltech.top/api/',
    // baseURL:'http://localhost:3000/api/',
    // baseURL:'/api/',
    timeout:5000
})
server.interceptors.request.use(config=>{
    if(localStorage.getItem('xxxtoken')){
        config.headers = {
            "Authorization": localStorage.getItem('xxxtoken'),
        }
        return config
    }
    return config
},errer=>{
    Promise.reject(errer);
})

server.interceptors.response.use(response=>{
    let res=response.data;
    return new Promise((resolve,reject)=>{
        if(res.code==200){
            resolve(res.data);
        }
        else if(res.stauts==303){
            reject(res);
        }
        else{
            reject(res)
        }
    })
})

const post=(url,data,options={})=>{
	options.data=data;
    options.url=url;
    options.method="POST"
    return server(options);
}
const get=(url,data,options={})=>{
	options.params=data;
    options.url=url;
    options.method="GET"
    return server(options)
}
function del(url,data,options={}){
	options.data=data;
    options.url=url;
    options.method="DELETE"
    return server(options)
}
function put(url,data,options={}){
	options.data=data;
    options.url=url;
    options.method="PUT"
    return server(options)
}
function upload(url,data,options={}){
    options.method = 'POST';
    options.headers = {
        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
    }
    options.data = {files:data};
    options.url = url;
    return server(options);
}
export default {server,get,post,del,put,upload}