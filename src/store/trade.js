import {reqAddressInfo,reqOrderInfo} from '@/api'
const state = {
    // 用户的地址信息
    address:[],
    // 商品的清单
    orderInfo:{}
};
const mutations = {
    // 获取用户的地址信息
    GETUSERADDRESS(state,address){
        state.address = address
    },
    // 获取商品清单的数据
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
};
const actions ={
    // 获取用户的地址
    async getUserAddress({commit}){
        let result = await reqAddressInfo();
        if(result.code == 200){
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取商品清单的数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('GETORDERINFO' , result.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}