import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api"
import { setToken ,getToken,removeToken} from "../utils/token";
const state = {
    code:'', 
    token:getToken(),
    reqUserInfo:{}  
};
const mutations = {
    // 获取验证码
    GETCODE(state,code){
        state.code = code
    },
    // 登录
    USERLOGIN(state,token){
        state.token = token
    },
    // 储存用户的信息
    GETUSERINFO(state,reqUserInfo){
        state.reqUserInfo = reqUserInfo;
    },
    // 退出登录
    CLEAR(state){
        // 清空仓库中的数据
        state.token='',
        state.reqUserInfo='',
        // 清空本地储存的数据
        removeToken()
    }
};
const actions = {
    // 获取验证码
    async getCode({commit} , phone){
        let result = await reqGetCode(phone);
        console.log(result);
        if(result.code == 200){
            commit('GETCODE', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户注册
    async userRegister({commit} , user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async userLogin({commit} , data){
        let result = await reqUserLogin(data)
        // 这里会返回一个token值，token就是一个字符串相当于用户的唯一标识
        // 注意 vuex没有数据的持久化 一刷新就没有了
        if(result.code == 200){
            commit("USERLOGIN", result.data.token);
            // 持久化储存token
            setToken(result.data.token)
                return "ok";
            
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户的信息【带上token发送请求】
    async getUserInfo({commit}){
        let result =await reqUserInfo();
        if(result.code ==200){
            commit('GETUSERINFO', result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        // 提交mutations 在mutations中清空state中的数据
        console.log(result);
        if(result.code ==200 ){
            commit('CLEAR')
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
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