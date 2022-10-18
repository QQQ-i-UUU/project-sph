<template>
  <div>
    <Header></Header>
    <!-- 使用路由的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
    
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
},
  data() {
    return {
    }
  },
  mounted() {
    //发送请求放在这里是为了只发送一次请求，优化性能
    //通知vuex发送请求，获取分类列表数据，存储与仓库当中
    this.$store.dispatch('Home/categoryList');
  }
}
</script>

<style>

</style>
