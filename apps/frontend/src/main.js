import Vue from "vue";
import {router} from "./router";
import App from "./App.vue";
import {createProvider} from "./vue-apollo";
import {store} from "./store";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
    apolloProvider: createProvider(),
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount("#app");
