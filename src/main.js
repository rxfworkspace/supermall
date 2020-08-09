import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线对象 
Vue.prototype.$bus = new Vue() 

//安装toast插件
Vue.use(toast)
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
