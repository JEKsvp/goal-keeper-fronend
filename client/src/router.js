import VueRouter from "vue-router";

import MainPage from './components/MainPage'
import Register from './components/register/Register'
import Login from './components/login/Login'
import UserPage from './components/user/UserPage'
import WelcomePage from './components/WelcomePage'


export default new VueRouter({
    routes: [
        {path: '/', component: WelcomePage},
        {path: '/main', component: MainPage},
        {path: '/register', component: Register},
        {path: '/login', component: Login},
        {path: '/user/:username', name: 'user', component: UserPage}
    ]
});