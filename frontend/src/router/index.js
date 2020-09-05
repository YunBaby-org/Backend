import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name:'/',
    component:Layout,
    hidden:true
    

  },
  {
    path:'/home',
    component:Layout,
    children:[
      {
        path:'index',
        name:'Home',
        component:()=>import('@/views/home/index')
      }
    ],
    meta: { title: '首頁', icon: 'el-icon-s-home' },
  },
  {
    path:'/setting',
    component:Layout,
    children:[
      {
        path:'index',
        name:"Setting",
        component:()=>import('@/views/setting/index')
      }
    ],
    meta: { title: '設定', icon: 'el-icon-setting' },
  },
  {
    path:'/map',
    component:Layout,
    meta:{title:'地圖',icon:'el-icon-map-location'},
    children:[
      {
        path:'index',
        name:'Map',
        component:()=>import('@/views/map/index.vue')
      }
    ]
  },
  {
    path:'/add',
    component:Layout,
    meta:{title:'新增',icon:'el-icon-plus'},
    children:[
      {
        path:'index',
        name:'Add',
        component:()=>import('@/views/add/index.vue')
      }
    ]
  },
  {
    path:'/stomp',
    component:Layout,
    meta:{title:'測試',icon:'el-icon-plus'},
    children:[
      {
        path:'index',
        name:'Stomp',
        component:()=>import('@/views/stomp/index.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import('@/views/login/index.vue'),
    hidden:true
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('@/views/register/index.vue'),
    hidden:true
  }
]

const router = new VueRouter({
  
  base: process.env.BASE_URL,
  routes
})

export default router
