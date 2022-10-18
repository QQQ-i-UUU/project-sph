import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//模块化
import Home from './Home'
import Search from './Search'
import Detail from './Detail'
import ShopCar from './ShopCar'
import User from './User'
import Trade from './Trade'

export default new Vuex.Store({
    modules: {
        Home,
        Search,
        Detail,
        ShopCar,
        User,
        Trade
    }
})