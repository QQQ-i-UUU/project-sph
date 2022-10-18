<template>
  <div class="type-nav">
    <div class="container" >
      <div @mouseenter.stop="enterShow" @mouseleave.stop="leaveShow">
          <h2 class="all" >全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
              <h3>
                <a :data-categoryName="c1.categoryName" 
                  :data-category1id="c1.categoryId" 
                  to="/search" 
                  @click="clearKeyword"
                  >{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" 
                      :data-category2id="c2.categoryId" 
                      to="/search" 
                      @click="clearKeyword"
                      >{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" 
                        :data-category3id="c3.categoryId" 
                        to="/search" 
                        @click="clearKeyword"
                        >{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            </div>
        
        </div>
        </transition>
      </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
  name: 'TypeNav',
  data() {
    return {
      isShow:true,
    }
  },
  mounted() {
    if (this.$route.path != '/home') {
      this.isShow = false;
    }
  },
  computed: {
    //两种读取数据的写法
    // ...mapState({categoryList:(state)=>state.Home.categoryList})
    ...mapState('Home',['categoryList'])
  },
  methods: {
    //解决卡顿方案：编程式导航 + 事件委派
    //但是存在问题，怎么保证点击的是否是三级菜单的a标签？——添加自定义属性
    goSearch(e) {
      let element = e.target
      let { categoryname, category1id, category2id, category3id } = element.dataset
      //选择出a标签
      if (categoryname) {
        //整理路由跳转参数
        let location = { name: 'search', }
        let query = {categoryName:categoryname}
        //一级标签
        if (category1id) {
          query.category1id = category1id
          //二级标签
        } else if (category2id) {
          query.category2id = category2id
          //三级标签
        } else{
          query.category3id = category3id
        }
        //判断是否有params参数，有就顺带
        if (this.$route.params) {
          //参数合并
          location.params = this.$route.params
          location.query = query
          //带参数跳转
          this.$router.push(location)
        }
        
      }
    },
    enterShow() {
      this.isShow = true;
    },
    leaveShow() {
      if (this.$route.path != '/home') {
        this.isShow = false;
      }
    },
    clearKeyword() {
      this.$bus.$emit('clear');
    }
  }
  }
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      a:hover{
        color:#e1251b;
        cursor: pointer;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover{
          background-color: skyblue;
        }
      }
    }

  }
}
</style>