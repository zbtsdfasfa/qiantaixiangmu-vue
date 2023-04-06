import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from '../router'
Vue.config.productionTip = false
// 引入store
import store from './store'
// 引入mock数据
import '@/mock/mockServe'
// 测试
import {reqCategoryList} from '@/api'
reqCategoryList()
// 引入swiper样式
import "swiper/css/swiper.css"
// 统一接口文件api里面的全部数据接口
import * as API from '@/api';
import dog from '@/assets/1.gif';
//引入插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:dog
});
// 注册全局组件
import { Button, MessageBox} from 'element-ui';
Vue.component(Button.name, Button);
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import {reqGetSearchInfo} from '@/api';
console.log(reqGetSearchInfo({}));






new Vue({
  render: h => h(App),
  // 注册router
  router,
  store,
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API
},
}).$mount('#app')
