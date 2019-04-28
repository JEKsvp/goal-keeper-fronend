import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Router from "./router"
import Store from "./store";
import VueSession from 'vue-session'
import SnackbarPlugin from './plugins/SnackbarPlugin'

Vue.config.productionTip = false;
import setupAuthInterceptor from './interceptors/AuthInterceptor'

setupAuthInterceptor();

Vue.use(VueSession);
Vue.use(SnackbarPlugin);
export default new Vue({
    render: h => h(App),
    router: Router,
    store: Store
}).$mount('#app');
