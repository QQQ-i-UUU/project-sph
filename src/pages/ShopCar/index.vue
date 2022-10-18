<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th7">型号</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="c in carInfoList" :key="c.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="c.isChecked ==1" @change="changeChecked(c.skuId,$event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="c.imgUrl">
            <div class="item-msg">{{c.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">动态展示商品型号还未实现</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{c.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,c)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="c.skuNum" @change="handler('s',$event.target*1,c)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,c)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{c.skuNum * c.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteShop(c.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&carInfoList.length>0" @change="changeAllCartChecked($event.target.checked)">
        <span>&nbsp;全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="delAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex';
  export default {
  name: 'ShopCar',
  mounted() {
    this.getData()
    
  },
  computed: {
    ...mapGetters('ShopCar', ['carList']),
      //最终想要的购物车列表数据
    carInfoList() {
      return this.carList.cartInfoList || [];
    },
    //计算购物车商品总价
    totalPrice() {
      let sum = 0;
      this.carInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice;
      })
      return sum;
    },
    //是否全选
    isAllChecked() {
      //遍历数组里面的属性，全部满足条件返回true，否则false
      return this.carInfoList.every(item=>item.isChecked==1)
    }
  },
  methods: {
    getData(){
      //获取个人购物车数据
      this.$store.dispatch('ShopCar/getShopCarList');
    },
    //修改商品数量 ,需要节流，防止用户点击过快
    handler: throttle(async function (type, num, good) {
      //type:区分三个修改类型
      //num：要修改多少
      //good：要修改数量的商品
      switch (type) {
        case 'add': num = 1; break;
        case 's': {
          //非数字和小于1的形况，传递0（不修改）
          if (isNaN(num) || num < 1) {
            num = 0;
            alert('内容错误，应为大于等于1的正整数')
          } else {
            num = parseInt(num) - good.skuNum
          }
          // num = (isNaN(num) || num < 1) ? 0 : parseInt(num) - good.skuNum;
          break;
        }
        case 'minus': {
          //先判断数量是否大于1，小于等于1，传给服务器0(不修改)
          num = good.skuNum > 1 ? -1 : 0;
          break;
        }
      }
      try { //修改成功
        //发送请求，更新数据
        await this.$store.dispatch('Detail/addOrUpdateShopCart', { skuId: good.skuId, skuNum: num });
        //刷新页面
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    },500),
    //删除某一个商品
    async deleteShop(id){
      try {
        await this.$store.dispatch('ShopCar/deleteShopById', id);
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    //修改某商品的选中状态
    async changeChecked(id, isChecked) {
      try {
        await this.$store.dispatch('ShopCar/changeCartCheckedById', { id: id, isChecked: isChecked ? '1' : '0' });
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },
    //删除所有选中的商品
    async delAllCheckedCart() {
      try {
        await this.$store.dispatch('ShopCar/deleteAllCheckedCart')
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },
    //修改所有商品的选中状态（全选按钮）
    async changeAllCartChecked(isChecked) {
      try {
        await this.$store.dispatch('ShopCar/changeAllCartChecked',  isChecked ? '1' : '0' );
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    }
  }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 12.5%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6,
        .cart-th7 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>