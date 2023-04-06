<template>
  <div id="app">
    <Header/>
    <!-- 这里是路由出口 -->
    <router-view></router-view>
    <!-- 判断footer组件的显示与隐藏 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import  Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer

  },
  mounted(){
     // 组件一挂载就在vuex中发送请求  然后储存到vuex中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>
