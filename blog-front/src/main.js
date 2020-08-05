// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'  //mavonEditor
import 'mavon-editor/dist/css/index.css'
import axios from 'axios' //axios
import Message from '@/utils/message.js'  //message
import api from '@/api/api.js'  //导入api接口
import VueI18n from 'vue-i18n'  //中英文切换

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(mavonEditor)
Vue.use(Message)
Vue.prototype.$api = api  //将api挂载到vue原型
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh', //从localStorage获取用户语言选择，没有默认使用中文
  messages: {
    'zh': require('@/language/zh.js'),
    'en': require('@/language/en.js'),
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n, //将i18n挂载到vue根实例上
  components: {App},
  template: '<App/>'
})
