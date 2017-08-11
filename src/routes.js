import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import User from './views/nav1/User.vue'
import Module from './views/nav2/Module.vue'
import UserModule from './views/nav3/UserModule.vue'
import RelationAreaTeam from './views/nav3/RelationAreaTeam.vue'
import UserAreaTeam from './views/nav3/UserAreaTeam.vue'
import ModuleAction from './views/nav3/ModuleAction.vue'
import AreaTeam from './views/nav4/AreaTeam.vue'
import Area from './views/nav4/Area.vue'
import Request from './views/nav5/Request.vue'
import Hello from './components/Hello.vue'



import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/YDManager/login',
        component: Login,
        name: '',
        hidden: true
    },
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
        name: '',
        leaf: true,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/YDManager/user', component: User, name: '用户' },
            // { path: '/table', component: Table, name: 'Table' },
            // { path: '/form', component: Form, name: 'Form' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/YDManager',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/YDManager/module', component: Module, name: '模块' },
            // { path: '/YDManager/page5', component: Page5, name: '页面5' }
        ]
    },
    
    {
        path: '/YDManager',
        component: Home,
        name: '区域 ',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/YDManager/area-team', component: AreaTeam, name: '区域组' },
            { path: '/YDManager/area', component: Area, name: '区域' },
        ]
    },{
        path: '/YDManager',
        component: Home,
        name: '',
        leaf:true,
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/YDManager/action', component: Request, name: '请求' },
        ]
    },
    {
        path: '/YDManager',
        component: Home,
        name: '关系',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/YDManager/user-module', component: UserModule, name: '用户-模块' },
            { path: '/YDManager/relation-areateam', component: RelationAreaTeam, name: '区域组-区域' },
            { path: '/YDManager/user-areateam', component: UserAreaTeam, name: '用户-区域组' },
            { path: '/YDManager/module-action', component: ModuleAction, name: '模块-请求' },
        ]
    },{
        path: '/YDManager',
        component: Home,
        name: '测试',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/YDManager/test-hello', component: Hello, name: 'Hello' },
        ]
    },
    {
        path: '/YDManager',
        hidden: true,
        redirect: { path: '/YDManager/user'}
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/YDManager/404' }
    }
    
];

export default routes;