import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久化存储
export const getUUID =()=>{
    // 先从本地存储中获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if(!uuid_token){
        // 生成临时游客身份
        uuid_token = uuidv4();
        // 本地储存一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token;
}