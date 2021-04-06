import Vue from 'vue'
import FirstLaboratory from './components/firstLaboratory'
import SecondLaboratory from './components/secondLaboratory'
import ThirdLaboratory from './components/thirdLaboratory'
import FourthLaboratory from './components/fourthLaboratory'
import SeventhLaboratory from './components/seventhLaboratory'
import EighthLaboratory from './components/eighthLaboratory'

import Router from 'vue-router'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/1',
      name: 'first',
      component: FirstLaboratory,
      props: true,
    },
    {
      path: '/2',
      name: 'second',
      component: SecondLaboratory,
      props: true,
    },
    {
      path: '/3',
      name: 'third',
      component: ThirdLaboratory,
      props: true,
    },
    {
      path: '/4',
      name: 'fourth',
      component: FourthLaboratory,
      props: true,
    },
    {
      path: '/7',
      name: 'seventh',
      component: SeventhLaboratory,
      props: true,
    },  {
      path: '/8',
      name: 'eighth',
      component: EighthLaboratory,
      props: true,
    },
  ]
});
