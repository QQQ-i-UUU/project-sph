import Vue from 'vue'
import App from './App.vue'
//引入数据仓库
import store from './store'
//引入mock的模拟数据
import '@/mock/mockServe' 
//引入swiper样式
import 'swiper/css/swiper.css'
//引入路由
import router from './router';
//引入饿了么UI
import { Button,MessageBox } from 'element-ui';
//注册全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Pagination from '@/components/Pagination/index.vue'
//统一接收api文件夹里的所有请求函数
//统一引入
import * as API from '@/api';
import atm from '@/assets/1.gif'
//注册插件
import VueLazyLoad from 'vue-lazyload' //懒加载
import '@/plugins/validate'  //表单验证插件

//注册全局组件两个参数，第一个全局组件名，第二个是哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);
//向vue原型对象中添加属性/方法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//安装插件
Vue.use(VueLazyLoad, {
  //懒加载默认的图片
  loading:atm
})
//关闭生产提示
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  //注册路由
  router,
  store,
  beforeCreate() {
    //安装全局事件总线
    Vue.prototype.$bus = this
    //安装所有接口请求函数
    Vue.prototype.$api = API
  }
}).$mount('#app')
