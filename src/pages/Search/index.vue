<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!--平台的售卖的属性值展示 -->
            <li class="with-x" 
              v-for="(attrValue, index) in searchParams.props"
              :key="index">
              {{ attrValue.split(":")[2] }}:{{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector 
          @trademarkInfo="trademarkInfo" 
          @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品展示 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="g in goodsList" :key="g.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${g.id}`" target="_self"><img v-lazy="g.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>&nbsp;{{g.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{g.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 -->
          <!-- pageNo当前页码，pageSize每一页展示多少数据 -->
          <!-- total总的数据数量，continues连续页码数 -->
          <Pagination 
            :pageNo='searchParams.pageNo' 
            :pageSize='searchParams.pageSize' 
            :total='searchList.total' 
            :continues='5'
            @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
  name: 'SearchComponent',
  data() {
    return {
      searchParams: {
          //一级分类id
        category1Id: '',
        //二级分类id
        category2Id: '',
        //三级分类id
        category3Id: '',
        //分类名字
        categoryName:'',
        //关键字
        keyword: '',
        //排序，初识状态应该是综合&降序
        order: '1:desc',
        //代表第几页
        pageNo: 1,
        //每一页展示多少个商品
        pageSize: 3,
        //商品售卖属性
        props: [],
        //品牌
        tradeMark:'',
        }
      }
    },
  components: {
    SearchSelector,
},
  computed: {
      // ...mapState('Search',['searchList'])
    ...mapGetters('Search', ['goodsList', 'trademarkList', 'attrsList']),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //获取search模块展示产品一共多少数据
    ...mapState('Search',['searchList']),
  },
  //在组件挂在完毕之前发送一次请求，挂载的时候就能展示相应数据的商品
  beforeMount() {
    //Object.assign： ES6语法，合并对象
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
  },
  mounted() {
    this.getData();
  },
  watch:{
    //监听路由的信息是否发生变化，如果变化，再次发送请求
    $route() {
      //每次请求完毕，应该把响应的1、2、3级分类id清空，让它们接收下一次相应的id
      //再次发送请求之前整理要带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发送请求
      this.getData();
      //从一个分类到另一个分类，之前的参数用不到了。
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.keyword = '';
    }
  },
  methods: {
    //把发送请求弄成函数，要发送请求的时候调用方法即可
    getData() {
      this.$store.dispatch('Search/getSearchInfo',this.searchParams)
    },
    //删除分类的名字
    removeCategoryName() {
      //把参数清空，属性值为空的字符串还是会把响应字段带给服务器
      //但是把字段改成 undefined，这个字段就不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //再次发送请求，刷新组件
      this.getData();
      //地址栏也要修改，进行路由跳转（只是跳回自己这里）
      //严谨的：本意是删除query，如果路径中出现params，不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$route.push({ name: 'search', params: this.$route.params });
      }
    },
    //删除关键字
    removeKeyword() {
      //把服务器带来的参数searchParams的keyword清空
      this.searchParams.keyword = undefined;
      //再次发请求，刷新组件
      this.getData();
      //通知兄弟组件Header清除关键字
      this.$bus.$emit('clear');
      //进行路由跳转
      if (this.$route.query) {
        this.$router.push({
          name: 'search',
          query:this.$route.query
        })
      }
    },
    //删除品牌信息
    removeTradeMark() {
      //将品牌信息清空
      this.searchParams.trademark = undefined;
      //再次发送请求，刷新组件
      this.getData();
    },
    //删除商品属性
    removeAttr(index) {
      //整理参数
      this.searchParams.props.splice(index, 1);
      //重新发送请求，刷新组件
      this.getData();
    },
    //排序操作
    changeOrder(flag) {
      //flag用户每次点击li标签的时候，用于区分是综合排序1还是价格排序2
      //获取order初始状态，需要通过初始状态去判断接下来做什么
      let originOrder = this.searchParams.order;
      //获取初始是1还是2
      let originFlag = originOrder.split(':')[0];
      //获取初始时asc还是desc
      let originSort = originOrder.split(':')[1];
      //新的排序方式
      let newOrder = '';
      //判断多次点击的是不是同一个按钮
      //如果是就修改排序
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`;
      } else {
        //点击的不是同一个按钮，默认倒序
        newOrder = `${flag}:${'desc'}`;
      }
      //需要给order重新赋值
      this.searchParams.order = newOrder;
      //再次发送请求，刷新组件
      this.getData();
    },


    //自定义事件回调
    trademarkInfo(trademark) {
      //1:整理品牌字段的参数  "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getData();
    },
    //收集平台属性地方回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      // console.log(attr, attrValue);
      //参数格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重，商品属性只能选择一次
      //if语句里面只有一行代码：可以省略大花括号
      if (this.searchParams.props.indexOf(props) == -1)
        this.searchParams.props.push(props);
      //再次发请求
      this.getData();
    },
    //获取当前是第几页
    getPageNo(pageNo) {
      //修改页码
      this.searchParams.pageNo = pageNo
      //再次发送请求，更新组件
      this.getData()
    }
  }
  
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>