
import {reqGetSearchInfo} from '@/api'
//search模块相关配置
// state是对数据进行相应的管理
const state = {
    searchList:{}
};
// mutations对数据进行相应的处理
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
// acrions中可以进行相应的逻辑或者业务上的操作
const actions = {
    async getSearchList({commit}, params = {}){
        let result = await reqGetSearchInfo(params)
        console.log(result);
        if(result.code == 200){
            commit("GETSEARCHLIST" ,result.data)
        }
    }
};
// getters相当于计算属性，简化state中的数据
// getters在项目中最主要的作用就是简化仓库中的数据，
// 可以把我们组件中的数据简化一下 
const getters = {
    // 当前形参state并非大仓库中的sate
    goodsList(state){
        return state.searchList.goodsList; 
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}