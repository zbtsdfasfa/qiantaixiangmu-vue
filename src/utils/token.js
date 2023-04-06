// 对外暴露一个函数
// 本地存储token
export const setToken = (token)=>{
    localStorage.setItem('TOKEN', token)
}
// 获得本地存储的token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
  };
// 清空本地储存的token
export const removeToken = ()=>{
    return localStorage.removeItem('TOKEN')
}