import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const Store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        login(user) {
            state.user = user;
        }
    }
});

export default Store;