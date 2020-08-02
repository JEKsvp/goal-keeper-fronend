import VueRouter from "vue-router";

import HomePage from './components/HomePage'
import Register from './components/signup/SignUp'
import Login from './components/signin/SignIn'
import UserPage from './components/user/UserPage'
import WelcomePage from './components/WelcomePage'
import Diary from "./components/diary/Diary";
import CreateNote from "./components/diary/CreateNote";
import Note from "./components/diary/Note";


export default new VueRouter({
    routes: [
        {path: '/', name: 'WelcomePage', component: WelcomePage},
        {
            path: '/home', name: 'Home', component: HomePage, children:
                [
                    {path: '/home/users/:username', name: 'User', component: UserPage},
                    {path: '/home/users/:username/diary/', name: 'Diary', component: Diary},
                    {path: '/home/users/:username/diary/notes/create', name: 'CreateNote', component: CreateNote},
                    {path: '/home/users/:username/diary/notes/:noteId', name: 'Note', component: Note},
                ],
        },
        {path: '/signup', name: 'SignUp', component: Register},
        {path: '/signin', name: 'SignIn', component: Login}
    ]
});