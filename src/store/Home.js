import {reqCategoryList,reqGetBannerList,reqGetFloorList}  from "@/api/index"
export default {
    namespaced:true,
    actions:{
        //发送请求
        async categoryList(context) {
            let result = await reqCategoryList();
            if (result.code == 200) {
                context.commit('CATEGORYLIST',result.data)
            }
        },
        //获取首页轮播图数据
        async getBannerList(context) {
            let result = await reqGetBannerList();
            if (result.code == 200) {
                context.commit('GETBANNERLIST',result.data)
            }
        },
        //获取floor轮播图数据
        async getFloorList(context) {
            let result = await reqGetFloorList();
            if (result.code == 200) {
                context.commit('GETFLOORLIST',result.data)
            }
        },
    },
    mutations:{
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList;
        },
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        GETFLOORLIST(state,floorList) {
            state.floorList = floorList
        }
    },
    
    state: {
        //服务器返回的是数组，所以要定义为数组
        categoryList: [],
        bannerList: [],
        floorList:[],
    },
}
