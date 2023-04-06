// 引入requests
import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动接口

export const reqCategoryList = ()=> requests({url:'/api/product/getBaseCategoryList' ,method:'get'})

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = ()=>mockRequests.get('/banner')
// 获取floor的数据
export const reqFloorList = () => mockRequests.get("/floor");

// 获取search的数据
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params)=>requests({url:"/api/list",method:"post",data:params});

// 获取商品详情的数据
export const reqGoodsInfo = (skuId)=>requests({url:`/api/item/${skuId}` , method:'get'})

// 将产品添加到购物车中（获取更新某一个参评的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/api/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
// 获取购物车列表的接口
export const reqCartList = ()=>requests({url:'/api/cart/cartList',method:'get'})
// 删除商品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/api/cart/deleteCart/${skuId}` , method:"delete"})
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid =(skuId,isChecked)=>requests({url:`/api/cart/checkCart/${skuId}/${isChecked}` , method:'get'})
//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode=(phone)=>requests({url:`/api/user/passport/sendCode/${phone}` , method:'get'})
//注册
//url:/api/user/passport/register  method:post    phone code password
export const reqUserRegister = (data)=>requests({url:'/api/user/passport/register', data, method:'post'})
//登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data)=>requests({url:'/api/user/passport/login' , data, method:'post'})
//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = ()=>requests({url:'/api/user/passport/auth/getUserInfo',method:'get'});
//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = ()=>requests({url:'/api/user/passport/logout' , method:'get'})
//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/api/user/userAddress/auth/findUserAddressList' , method:'get'})
//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/api/order/auth/trade' , method:'get'})
//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder= (tradeNo,data) =>requests({url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) =>requests({url:`/api/payment/weixin/createNative/${orderId}`,method:'get'})
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) =>requests({url:`/api/payment/weixin/queryPayStatus/${orderId}` , method:'get'})

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList= (page,limit) =>requests({url:`/api/order/auth/${page}/${limit}`,method:'get'})