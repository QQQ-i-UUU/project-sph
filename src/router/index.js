//该文件专门用于创建整个应用的路由
import Vue from 'vue';
//引入VueRouter
import VueRouter from "vue-router";
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//重写push和replace方法
//先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//每一次调用push方法都会返回一个promise
//这个promise需要有成功或者失败的回调
//
//第一个参数，告诉原来push方法，往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this,location,resolve,reject)
    } else {
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this,location,resolve,reject)
    } else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

import routes from './routes'

//配置路由
const router = new VueRouter({
    //hash模式
    mode:'hash',
    routes,
    //滚动行为
    scrollBehavior() {
        //代表滚动条在最上方
        return { y: 0 }
    }
});
//全局前置守卫
router.beforeEach(async(to, from, next) => {
    let token = store.state.User.token;
    //用户名，用于判断是否已经有用户信息,不能用userinfo是因为空对象也会判断为真
    let userName = store.state.User.userInfo.name;
    //有token说明已经登录
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            //用户已经登陆,不允许进入登录页/注册页，默认跳转首页
            next('/home')
        } else {
            //登录了，放行
            if (userName) {
                next();
            } else {
                //这里是刷新页面之后保持登录状态的关键
                try { //没有登录信息，先发送请求存储用户信息再跳转
                    await store.dispatch('User/getUserInfo');
                    //获取信息成功，跳转
                    next();
                } catch (error) {
                    alert('身份状态过期，请重新登录');
                    //清除过期的token
                    await store.dispatch('User/userLogOut');
                    //跳转到登录页
                    next('/login');
                }
            }
        }
    } else { //用户未登录，提示登录/注册
        //不能去交易相关、支付相关、个人中心 
        if (to.path == '/home' || to.path == '/search' || to.path == '/shopCar' || to.path == '/detail' || to.path == '/login' || to.path == '/register') {
            next();
        } else {
            //否则跳转登录页
            next('/login?redirect=' + to.path)
        }
    }
})

export default router
