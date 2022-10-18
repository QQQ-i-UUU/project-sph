import { reqGoodsDetailInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份uuid ——> 生成一个不变的字符串
import { getUUID } from "@/utils/uuid_token";
export default {
    namespaced:true,
    actions: {
        //发送请求
        async getGoodsInfo(context,id) {
            let result = await reqGoodsDetailInfo(id);
            if (result.code == 200) {
                context.commit('GETGOODSINFO',result.data)
            }
        },
        //将产品添加到购物车中
        async addOrUpdateShopCart(context, { skuId, skuNum, }) {
            //加入购物车之后，服务器没有返回数据，只是返回成功的code
            //不需要存储额外的数据
            let result = await reqAddOrUpdateShopCart(skuId, skuNum);
            //这个函数会返回promise对象，可以返回状态让组件知道该请求是成功还是失败的
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('Failed'));
            }
        }
    },
    mutations: {
        GETGOODSINFO(state, goodsInfo) {
            state.goodsInfo = goodsInfo;
        },
    },
    getters: {
        //目录信息
        categoryView(state) {
            return state.goodsInfo.categoryView || {};
        },
        //商品信息
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {};
        },
        //商品售卖信息
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || [];
        },
    },
    state: {
        goodsInfo: {},
        uuid_token:getUUID()
    }
}