//登录于注册的模块
import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut } from '@/api';

export default {
    namespaced:true,
    actions: {
        //获取验证码
        async getCode(context,phone) {
            let result = await reqGetCode(phone);
            if (result.code == 200) {
                context.commit('GETCODE', result.data);
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        //用户注册
        async userRegister(context,user) {
            let result = await reqUserRegister(user);
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        //用户登录
        async userLogin(context,user) {
            let result = await reqUserLogin(user);
            if (result.code == 200) {
                //用户登录且拿到token存入仓库
                context.commit('USERLOGIN', result.data.token)
                //持久化存储token  localStorage
                localStorage.setItem('Token',result.data.token)
                return 'ok';
            } else {
                return Promise.reject(new Error('登录失败'));
            }
        },
        //获取用户信息
        async getUserInfo(context) {
            let result = await reqUserInfo();
            if (result.code == 200) {
                context.commit('GETUSERINFO',result.data)
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        //退出登录
        async userLogOut(context) {
            let result = await reqLogOut();
            if (result.code == 200) {
                context.commit('CLEARUSERINFO');
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
                
            }
        }

    },
    mutations: {
        //存验证码
        GETCODE(state,code) {
            state.code = code
        },
        //存储token
        USERLOGIN(state, token) {
            state.token = token
        },
        //存储用户信息
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        //清除用户信息
        CLEARUSERINFO(state) {
            state.token = '';
            state.userInfo = {};
            localStorage.removeItem('Token');
        }
    },
    getters: {
        
    },
    state: {
        code: '',
        token: localStorage.getItem('Token'),
        userInfo:{},
    }
}