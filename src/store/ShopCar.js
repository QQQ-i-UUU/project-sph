import { reqShopCarList,reqDeleteShopById,reqChangeCartCheckedById } from "@/api";
export default {
    namespaced:true,
    actions: {
        //获取购物车列表数据
        async getShopCarList(context) {
            let result = await reqShopCarList();
            if (result.code == 200) {
                context.commit('GETSHOPCARLIST',result.data)
            }
        },
        //删除购物车的某一个商品
        async deleteShopById(context,id) {
            let result = await reqDeleteShopById(id);
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        //修改购物车某商品的选中状态
        async changeCartCheckedById(context, { id, isChecked }) {
            let result = await reqChangeCartCheckedById(id, isChecked);
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        //删除购物车中所有选中的商品
        deleteAllCheckedCart({ dispatch, getters }) {
            let promiseAll = [];
            getters.carList.cartInfoList.forEach(item => {
                let result = item.isChecked == 1 ? dispatch('deleteShopById', item.skuId) : '';
                //将每一次返回的promise结果添加到数组中
                promiseAll.push(result);
            });
            //.all方法，所有promise都为成功，返回成功；有一个失败，返回失败
            return Promise.all(promiseAll);
        },
        //修改所有商品的选中状态（全选按钮）
        changeAllCartChecked({ dispatch, state }, isChecked) {
            let promiseAll = [];
            state.shopCarList[0].cartInfoList.forEach(item => {
                let result = dispatch('changeCartCheckedById', { id: item.skuId, isChecked });
                promiseAll.push(result);
            });
            return Promise.all(promiseAll); 
        }
    },
    mutations: {
        GETSHOPCARLIST(state, shopCarList) {
            state.shopCarList = shopCarList;
        },
    },
    getters: {
        carList(state) {
            return state.shopCarList[0] || {};
        }
    },
    state: {
        shopCarList:[],
    }
}