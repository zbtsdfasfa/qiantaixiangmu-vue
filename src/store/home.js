//home模块相关配置
import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'
// state是对数据进行相应的管理
const state = {
    
    categoryList:[],
    // 首页轮播图的数据
    bannerList:[],
    // floor数据
    floorList:[]
};
// mutations对数据进行相应的处理
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    // 轮播图的数据
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    // floor数据
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
// acrions中可以进行相应的逻辑或者业务上的操作
const actions = {
   async categoryList({commit}){
      let result = await reqCategoryList()
    //   console.log(result);
      if(result.code == 200){
        commit('CATEGORYLIST',result.data)
      }
    },
    // 获取首页轮播图数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        // console.log(result);
        if(result.code == 200){
            commit('GETBANNERLIST', result.data);
        }
    },
    //获取floor的数据
    async getFloorList({commit}){
      let result =  await reqFloorList()
      if(result.code == 200){
        // 提交mutations
        commit("GETFLOORLIST", result.data)
      }
    }
};
// getters相当于计算属性，简化state中的数据
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}