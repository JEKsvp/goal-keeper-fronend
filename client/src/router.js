import VueRouter from "vue-router";

import HomePage from './components/home/HomePage'
import Register from './components/signup/SignUp'
import Login from './components/signin/SignIn'
import UserPage from './components/user/UserPage'
import WelcomePage from './components/WelcomePage'
import Diary from "./components/diary/Diary";
import CreateNote from "./components/diary/CreateNote";
import Note from "./components/diary/Note";
import Contacts from "./components/contacts/Contacts";
import AboutUs from "./components/aboutus/AboutUs";
import TherapistSearchPage from "./components/terapists/TherapistSearchPage";
import TherapistPage from "./components/terapists/TherapistPage";


export default new VueRouter({
    routes: [
        {path: '/', name: 'WelcomePage', component: WelcomePage},
        {path: '/contacts', name: 'Contacts', component: Contacts},
        {path: '/aboutus', name: 'AboutUs', component: AboutUs},
        {
            path: '/home', name: 'Home', component: HomePage, children:
                [
                    {path: '/home/users/:username', name: 'User', component: UserPage},
                    {path: '/home/users/:username/diary/', name: 'Diary', component: Diary},
                    {path: '/home/users/:username/diary/notes/create', name: 'CreateNote', component: CreateNote},
                    {path: '/home/users/:username/diary/notes/:noteId', name: 'Note', component: Note},
                    {path: '/home/therapists', name: 'TherapistSearchPage', component: TherapistSearchPage},
                    {path: '/home/therapists/:username', name: 'TherapistPage', component: TherapistPage},
                ],
        },
        {path: '/signup', name: 'SignUp', component: Register},
        {path: '/signin', name: 'SignIn', component: Login}
    ]
});