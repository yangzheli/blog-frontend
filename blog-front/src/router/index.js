import Vue from 'vue'
import Router from 'vue-router'

//懒加载，只有在访问页面的时候才去请求资源，而不是一次全部加载完
const Layout = () => import('@/pages/Layout.vue')
const Home = () => import('@/pages/Home.vue')
const Archive = () => import('@/pages/Archive.vue')
const About = () => import('@/pages/About.vue')
const Admin = () => import('@/pages/Admin.vue')
const User = () => import('@/pages/User.vue')
const ArticleEdit = () => import('@/pages/ArticleEdit.vue')
const ArticlePreview = () => import('@/pages/ArticlePreview.vue')
const Login = () => import('@/pages/Login.vue')
const Register = () => import('@/pages/Register.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [{
        name: 'Home',
        path: '/',
        component: Home,
      }, {
        name: 'Archive',
        path: '/archive',
        component: Archive
      }, {
        name: 'About',
        path: '/about',
        component: About
      }, {
        name: 'Admin',
        path: '/admin',
        component: Admin
      }, {
        name: 'User',
        path: '/user',
        component: User,
      }, {
        name: 'ArticlePreview',
        path: '/article/preview',
        component: ArticlePreview
      }]
    }, {
      name: 'ArticleEdit',
      path: '/article/edit/',
      component: ArticleEdit
    }, {
      name: 'Login',
      path: '/login',
      component: Login
    }, {
      name: 'Register',
      path: '/register',
      component: Register
    }
  ]
})
