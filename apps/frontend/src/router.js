import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "./views/HomeView";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/home",
            name: "home",
            component: HomeView,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.name === null) {
        next({name: "home"});
        return;
    }
    next();
});
