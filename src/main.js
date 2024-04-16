import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// 引入EChartsLoading弹窗
import CLoading from '@/components/tool/loading';
import CDialog from '@/components/tool/dialog';

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入自定义样式文件
import '@/style/index.scss';

// 引入iconfont图标库
import '@/style/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('CLoading', CLoading)
Vue.component('CDialog', CDialog)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
