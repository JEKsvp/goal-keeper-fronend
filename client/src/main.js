import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Router from "./router"
import Store from "./store";
import VueSession from 'vue-session'

Vue.config.productionTip = false;
import setupAuthInterceptor from './auth'

setupAuthInterceptor();

Vue.use(VueSession);
export default new Vue({
    render: h => h(App),
    router: Router,
    store: Store
}).$mount('#app');
