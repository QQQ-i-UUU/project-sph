//对axios进行二次封装
import axios from 'axios';
//引入进度条
import nProgress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'
//引入数据仓库store
import store from '@/store'

//1.利用axios对象方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const request = axios.create({
    //配置对象
    //基础路径
    baseURL: '/api',
    //请求超时事件
    timeout:5000
    ,
})
//请求拦截器
request.interceptors.request.use((config) => {
    //config:配置对象，独享里面有一个属性很重要，headers请求头
    //进度条开始
    nProgress.start();
    //如果有一个uuid
    if (store.state.Detail.uuid_token) {
        //请求头添加一个字段，后台已经准备好了
        config.headers.userTempId = store.state.Detail.uuid_token;
    }
    //需要携带token带给服务器
    if (store.state.User.token)
        config.headers.token = store.state.User.token;
    return config;
});

//响应拦截器
request.interceptors.response.use(res => {
     //成功的回调函数
    //进度条结束
    nProgress.done();
    return res.data
}, error => {
    //失败的回调函数， 终止promise链
    return Promise.reject(new Error(error));
})

export default request;