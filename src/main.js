import Vue from 'vue'
import App from './App.vue'
import jsPlumb from 'jsplumb'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

new Vue({
  render: h => h(App),
}).$mount('#app')
