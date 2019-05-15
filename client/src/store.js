import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const Store = new Vuex.Store({
    state: {
        currentUser: null
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
        }
    }
});

export default Store;