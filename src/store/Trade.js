import { reqUserAddressInfo,reqOrderInfo } from "@/api";

export default {
    namespaced: true,
    actions: {
        //获取用户地址信息
        async getUserAddressInfo(context) {
            let result = await reqUserAddressInfo();
            if (result.code == 200) {
                context.commit('GETUSERADDRESS',result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        //获取商品清单
        async getOrderInfo(context) {
            let result = await reqOrderInfo();
            if (result.code == 200) {
                context.commit('GETORDERINFO',result.data)
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
            }
        }
    },
    mutations: {
        GETUSERADDRESS(state, userAddress) {
            state.userAddress = userAddress
        },
        GETORDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo
        }
    },
    getters: {
        
    },
    state: {
        userAddress: [],
        orderInfo: {},
    }
}
