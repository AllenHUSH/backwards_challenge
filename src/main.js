import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

// 夜间模式
// import theme from 'muse-ui/lib/theme';
// theme.use('dark');

Vue.use(MuseUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
