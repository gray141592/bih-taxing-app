import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Ulaz from '../views/Ulaz.vue';
import Izlaz from '../views/Izlaz.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ulaz',
    name: 'Ulaz',
    component: Ulaz,
  },
  {
    path: '/izlaz',
    name: 'Izlaz',
    component: Izlaz,
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
