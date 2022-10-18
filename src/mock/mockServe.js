//引入mock模块
import Mock from 'mockjs'

//引入json数据
//webpack默认对外暴露：图片、json数据格式
import banner from './banner.json'
import floor from './floor.json'
import userAddressInfo from './userAddressInfo.json'
import trade from './trade.json'

//模拟数据：第一个参数请求地址  第二个请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor', { code: 200, data: floor })
Mock.mock('/mock/userAddressInfo', { code: 200, data: userAddressInfo })
Mock.mock('/mock/trade',{code:200,message:'成功',data:trade,ok:true})