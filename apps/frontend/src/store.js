import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        pendingNotifications: [],
    },
    mutations: {
        addPendingNotification(state, message) {
            state.pendingNotifications.push(message);
        },
        clearNotification(state) {
            state.pendingNotifications.shift();
        },
    },
});
