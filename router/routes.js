
// 引入路由组件
// import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
// 引入二级路由
import Myorder from '../pages/Myorder'
import Grouporder from '../pages/Grouporder'
// 路由的相关配置
export default [
    {
        path:'/center',
        component:Center,
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:Myorder
            },
            {
                path:'grouporder',
                component:Grouporder
            },
            // 路由重定向
            {
                path:'',
                redirect:'myorder'
            },
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter(to, from ,next){
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
       path:'/pay' ,
       component:Pay,
       meta:{show:true},
    //    路由独享守卫
    beforeEnter(to,from ,next){
        if(from.path == '/trade'){
            next()
        }else{
            next(false)
        }
    }
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true},
        // 路由独享守卫
        beforeEnter(to,from,next){
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/home',
        component:()=>import('../pages/Home'),
        meta:{show:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
        
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true}
        
    },
    {
        name:'detail',
        path:'/detail/:skuid',
        component:Detail,
        meta:{show:true}
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    // 路由重定项  就是当我们访问/的时候 就直接跳转到首页
    {
        path:'/',
        redirect:'/home'
    }
]