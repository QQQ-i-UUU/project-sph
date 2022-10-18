//API统一管理
import request from "./request";
import mockRequest from "./mockAjax";

//发送请求，获取分类菜单数据
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });
//模拟发送请求，获取轮播图
export const reqGetBannerList = () => mockRequest.get('/banner');
//获取floor数据
export const reqGetFloorList = () => mockRequest.get('/floor');
//获取搜索模块数据
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'post',data:params });
//获取详情页数据
export const reqGoodsDetailInfo = (id) => request({ url: `/item/${id}`, method: 'get' });
//将产品添加到购物车中，或更新购物车里商品数量
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
//获取购物车列表数据
export const reqShopCarList = () => request({ url: '/cart/cartList', method: 'get' });
//删除购物车的商品
export const reqDeleteShopById = (id)=>request({url:`/cart/deleteCart/${id}`,method:'delete'})
//修改商品选中状态
export const reqChangeCartCheckedById = (id, isChecked) => request({ url: `/cart/checkCart/${id}/${isChecked}`, method: 'get' });
//获取验证码
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
//注册 参数  phone  code  password
export const reqUserRegister = (data)=>request({url:'/user/passport/register',data,method:'post'})
//登录
export const reqUserLogin = (data) => request({ url: '/user/passport/login', data, method: 'post' });
//获取用户信息，需要token
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' });
//退出登录
export const reqLogOut = () => request({ url: '/user/passport/logout', method: 'get' });
//获取用户地址信息
export const reqUserAddressInfo = () => mockRequest.get('/userAddressInfo');
//获取商品清单
export const reqOrderInfo = () => mockRequest.get('/trade');
// export const reqOrderInfo = () => request({ url: '/order/auth/1/5', method: 'get' });
//提交订单
export const reqSubmitOrder = (tradeNo, data) => request({ ulr: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });
//获取支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
//获取支付状态
export const reqPayStatus = (orderId) => request({ ulr: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
//获取个人中心的数据
export const reqMyOrderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' });