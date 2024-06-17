import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tableTooltip from '@/index.js'

Vue.config.productionTip = false

Vue.use(tableTooltip, {
  theme: "light", // dark | light
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
