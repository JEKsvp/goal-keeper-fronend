import VueRouter from "vue-router";

import Register from './components/signup/SignUp'
import Login from './components/signin/SignIn'
import UserPage from './components/client-components/profile/ClientProfile'
import WelcomePage from './components/WelcomePage'
import Diary from "./components/client-components/diary/Diary";
import CreateNote from "./components/client-components/diary/CreateNote";
import Note from "./components/client-components/diary/Note";
import Contacts from "./components/contacts/Contacts";
import AboutUs from "./components/aboutus/AboutUs";
import TherapistSearchPage from "./components/client-components/therapists/TherapistSearchPage";
import TherapistPage from "./components/client-components/therapists/TherapistPage";
import TherapistClientList from "./components/therapist-components/clients/TherapistClientList";
import ClientHome from "./components/client-components/ClientHome";
import TherapistHome from "./components/therapist-components/TherapistHome";
import TherapistProfile from "./components/therapist-components/profile/TherapistProfile";
import DiaryAsTherapist from "./components/therapist-components/diary/DiaryAsTherapist";
import NoteAsTherapist from "./components/therapist-components/diary/NoteAsTherapist";


export default new VueRouter({
    routes: [
        {path: '/', name: 'WelcomePage', component: WelcomePage},
        {path: '/contacts', name: 'Contacts', component: Contacts},
        {path: '/aboutus', name: 'AboutUs', component: AboutUs},
        {
            path: '/client', name: 'ClientHome', component: ClientHome, children:
                [
                    {path: '/client/profile', name: 'ClientProfile', component: UserPage},
                    {path: '/client/diary', name: 'ClientDiary', component: Diary},
                    {path: '/client/diary/notes/create', name: 'CreateClientNote', component: CreateNote},
                    {path: '/client/diary/notes/:noteId', name: 'ClientNote', component: Note},
                    {path: '/client/therapists', name: 'TherapistSearchPage', component: TherapistSearchPage},
                    {path: '/client/therapists/:username', name: 'TherapistPage', component: TherapistPage},

                ]
        },
        {
            path: '/therapist', name: 'TherapistHome', component: TherapistHome, children:
                [
                    {path: '/therapist/profile', name: 'TherapistProfile', component: TherapistProfile},
                    {path: '/therapist/clients', name: 'TherapistClientList', component: TherapistClientList},
                    {path: '/therapist/clients/:username/diary', name: 'DiaryAsTherapist', component: DiaryAsTherapist},
                    {
                        path: '/therapist/clients/:username/diary/notes/:noteId',
                        name: 'NoteAsTherapist',
                        component: NoteAsTherapist
                    }
                ]
        },
        {path: '/signup', name: 'SignUp', component: Register},
        {path: '/signin', name: 'SignIn', component: Login}
    ]
});