import Vue from 'vue'
import FirstLaboratory from './components/firstLaboratory'
import SecondLaboratory from './components/secondLaboratory'
import Router from 'vue-router'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/1',
      name: 'settings',
      component: FirstLaboratory,
      props: true,
    },
    {
      path: '/2',
      name: 'settings',
      component: SecondLaboratory,
      props: true,
    },
  ]
});
