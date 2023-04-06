// 对axios的二次封装
import axios from "axios";
// 引入nprogress
import nprogress from "nprogress"
// 引入进度条样式
import "nprogress/nprogress.css"
// 引入仓库
import store from "../store";

// 1:利用axios对象的方法create。去创建一个axios实列
// 2：request就是axios  只不过进行了封装
const requests = axios.create({
    // 配置对象 
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:"http://gmall-h5-api.atguigu.cn",
    // 代表请求的超时的时间5s
    timeout:5000,
});

// 请求拦截器 发请求之前可以处理一些业务或者逻辑
requests.interceptors.request.use((config) =>{
    // config:配置对象  里面有个headers请求头很重要
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 带着token向服务器发送数据
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start();
    return config;
    
});

// 响应拦截器
requests.interceptors.response.use((res) =>{
    nprogress.done();
    return res.data;
    // nprogress结束 
      
},(error) =>{
    console.log(error);
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requests