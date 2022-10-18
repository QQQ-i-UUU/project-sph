import { reqGetSearchInfo } from "@/api"
export default {
    namespaced:true,
    actions:{
        async getSearchInfo(context,params ={}) {
            let result = await reqGetSearchInfo(params);
            if (result.code == 200) {
                context.commit('GETSEARCHLIST',result.data)
            }
        },
    },
    
    mutations:{
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList;
        },
    },

    //getters，加工数据
    getters: {
        goodsList(state) {
            //可能由于网络问题返回不了数据，返回空数组，因为取出来的List都是数组
            return state.searchList.goodsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        }
    },
    
    state:{
        searchList:{},
    },
}
