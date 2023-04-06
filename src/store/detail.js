import { reqGoodsInfo ,reqAddOrUpdateShopCart } from "../api";
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
};
const actions = {
    // 获取产品信息的actions
    async getGoodInfo({commit} , skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 加入购物车或者修改某一个产品的参数
    async addOrUpdateShopCart({commit} ,{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    //    如果成功了返回的东西
    if(result.code == 200){
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
    }
};
const getters = {
    // 商品详情面包屑的简化数据
    categoryView(state){
        return state.goodInfo.categoryView ||{}
    },
    // 商品详情的简化数据
    skuInfo(state){
        return state.goodInfo.skuInfo ||{}
    },
    // 商品属性选项的悬着
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}