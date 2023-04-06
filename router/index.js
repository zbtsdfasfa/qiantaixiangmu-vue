// 路由的相关配置
// 引入路由
import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes";
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from "@/store";
import { formToJSON } from "axios";
//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
// 创建并且暴露router
let router =  new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        // 返回的y=0的意思是  跳转路由的时候滚动条在最顶上
        return { y: 0 }
    }
})

// 全局前置路由守卫
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到你要跳转到那个路由的信息
    // from:可以获取到你从哪个路由跳转来的信息
    // next:放行函数  里面写你要放行的路径
    // 用户只要登录了就会有token值  

    // 为了测试全部放行
    next()
    let token = store.state.user.token;
    // 获取用户信息
    let name = store.state.user.reqUserInfo.name
   if(token){
    // 已经登陆了 想跳转到login界面 -----不行
    if(to.path=='/login'){
        next('/');
    }else{
        // 已经登录了 去的是search 等其他页面
        // 判断有没有用户信息 有就放行 没有的话就要派发actions获取用户的信息
        if(name){
            next()
        }else{
        // 派发actions 获取用户的信息
        try {
            await store.dispatch('getUserInfo')
            // 获取到用户信息 进行跳转
            next()
        } catch (error) {
            // token 失效了 获取不到用户的信息 清除token重新登录
            await store.dispatch('userLogout')
            next('/login')
        }
        }
    }

   }else{
    // 未登录不能去trader 支付香瓜页面和个人中心
    let toPath = to.path;
    if(toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center' !== -1)){
      // 把未登录 但想去没去成的路由信息存储到地址栏中
      next('/login?redirect='+toPath);
    }else{
      next()
    }
    
   }
})

export default router
