import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import User from './views/nav1/User.vue'
import Module from './views/nav2/Module.vue'



import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    // {
    //     path: '/login',
    //     component: Login,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/YDManager/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/YDManager',
        component: Home,
        name: '用户',
        // leaf: true,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: 'user', component: User, name: '用户' },
            // { path: '/table', component: Table, name: 'Table' },
            // { path: '/form', component: Form, name: 'Form' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/YDManager',
        component: Home,
        name: '模块',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: 'module', component: Module, name: '模块' },
            // { path: '/YDManager/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/YDManager',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/YDManager/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/YDManager',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/YDManager/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/YDManager/404' }
    },
    {
        path: '/YDManager/index.html',
        hidden: true,
        redirect: { path: '/YDManager/user' }
    },

];

export default routes;