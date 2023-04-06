// 对vuex的相关配置
import Vue from "vue";
// 引入vuex
import Vuex from "vuex"

// 引入小仓库
import home from "./home"
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

// 使用vuex
Vue.use(Vuex)


export default new Vuex.Store({
    // 实现vuex模块化
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }

})