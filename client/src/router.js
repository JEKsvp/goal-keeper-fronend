import VueRouter from "vue-router";

import HomePage from './components/HomePage'
import Register from './components/register/SignUp'
import Login from './components/login/SignIn'
import UserPage from './components/user/UserPage'
import WelcomePage from './components/WelcomePage'
import Diaries from "./components/diary/Diaries";
import CreateDiary from "./components/diary/CreateDiary";


export default new VueRouter({
    routes: [
        {path: '/', component: WelcomePage},
        {
            path: '/home', name: 'Home', component: HomePage, children:
                [
                    {path: '/home/users/:username', name: 'User', component: UserPage},
                    {path: '/home/diaries/create', name: 'CreateDiary', component: CreateDiary},
                    {path: '/home/diaries/:username', name: 'Diaries', component: Diaries}
                ],
        },
        {path: '/signup', name: 'SignUp', component: Register},
        {path: '/signin', name: 'SignIn', component: Login}
    ]
});