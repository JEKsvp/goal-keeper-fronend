import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

import MainPage from './components/MainPage'
import Register from './components/register/Register'
import Login from './components/login/Login'
import UserPage from './components/user/UserPage'


const Router = new VueRouter({
    routes: [
        {path: '/', component: MainPage},
        {path: '/register', component: Register},
        {path: '/login', component: Login},
        {path: '/user/:username', name: 'user', component: UserPage}
    ]
});

export default Router;