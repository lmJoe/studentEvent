import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import common from '@/libs/units.js'
import tool from '@/libs/tool.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import component from '@/libs/common.js'
Vue.use(ViewUI)
Vue.use(component)

Vue.prototype.tool = tool;

Vue.prototype.common = common
Vue.config.productionTip = false



// /*
// * 全局前置路由 在路由进入前start进度条
// * */
// router.beforeEach((to, from ,next) => {
//   NProgress.start()
//   next()
// })

// /*
// * 全局后置路由 在路由完成时done进度条
// * */
// router.afterEach( () => {
//   NProgress.done()
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')