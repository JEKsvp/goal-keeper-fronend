import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'

import Register from './components/register/Register'
import Login from './components/login/Login'

Vue.config.productionTip = false
const router = new VueRouter({
    routes: [
        {path: '/register', component: Register},
        {path: '/login', component: Login}
    ]
})


Vue.use(VueRouter)
new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
