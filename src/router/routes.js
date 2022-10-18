//已完成路由懒加载
//当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
//如果我们能把不同路由对应的组件分割成不同的代码块，
//然后当路由被访问的时候才加载对应组件，这样就会更加高效。

//配置路由信息
export default [
    {//主页
        name:'name',
        path: '/home',
        component: ()=>import('@/pages/Home'),
        //是否显示footer组件
        meta:{isShow:true}
    },
    {//搜索页
        name:'search',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta:{isShow:true}
    },
    {//登录页
        name:'login',
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta:{isShow:false}
    },
    {//注册页
        name:'register',
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta:{isShow:false}
    },
    {//商品详情页
        name: 'detail',
        path: '/detail/:goodsId',
        component: ()=>import('@/pages/Detail'),
        meta:{isShow:false}
    },
    {//加入购物车成功
        name: 'addCarSuccess',
        path: '/addCarSuccess/:num',
        component: ()=>import('@/pages/AddCarSuccess'),
        meta:{isShow:true}
    },
    {//购物车
        name: 'shopCar',
        path: '/shopCar',
        component: ()=>import('@/pages/ShopCar'),
        meta:{isShow:true}
    },
    {//订单页
        name: 'trade', 
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: { isShow: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //要进入订单页只能从购物车来
            if (from.path == '/shopCar') {
                next();
            } else {
                //其他的话就停留在当前页面
                next(false);
            }
        }
    },
    {//支付页
        name: 'pay',
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        // 将query参数映射成props传递给路由组件
        props: route => ({orderId: route.query.orderId}),
        meta: { isShow: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //要进入订单页只能从购物车来
            if (from.path == '/trade') {
                next();
            } else {
                //其他的话就停留在当前页面
                next(false);
            }
        }
    },
    {//支付成功页
        name: 'paySuccess',
        path: '/paySuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { isShow: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //要进入订单页只能从购物车来
            if (from.path == '/pay') {
                next();
            } else {
                //其他的话就停留在当前页面
                next(false);
            }
        }
    },
    {//个人中心页
        name: 'center',
        path: '/center',
        component: ()=>import('@/pages/Center'),
        meta: { isShow: true },
        children: [
            {
                path: 'myOrder',
                component:()=>import('@/pages/Center/myOrder')
            },
            {
                path: 'groupOrder',
                component:()=>import('@/pages/Center/groupOrder')
            },
            {//重定向
                path: '/center',
                redirect:'/center/myOrder'
            }
        ]
            
    },
    {//测试页
        name: 'test',
        path: '/test',
        component: () => import('@/pages/Test')
    },
    //重定向，在项目跑起来的时候默认访问首页组件
    {
        path: '*',
        redirect:'/home'
    }
]