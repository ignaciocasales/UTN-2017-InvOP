import VueRouter from "vue-router";

// Components.
import notFound from "./../components/io-not-found.vue";
import home from "./../components/io-home.vue";
import simulation from "./../components/io-simulation.vue";

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/notFound'
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/notFound',
            component: notFound
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/simulation',
            component: simulation
        }
    ]
});
