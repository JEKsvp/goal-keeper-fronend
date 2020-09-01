import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const Store = new Vuex.Store({
    state: {
        currentUser: null,
        accesses: []
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
        },

        setAccesses(state, accesses) {
            state.accesses = accesses;
        }
    }
});

export default Store;