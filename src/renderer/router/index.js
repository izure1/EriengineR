import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router

router = new Router({
  routes: [
    {
      path: '/engine',
      name: 'Engine',
      component: require('@/components/engine/Engine').default
    },
    {
      path: '/engine/test',
      name: 'test',
      component: require('@/components/engine/Test').default
    },
    {
      path: '*',
      name: 'error',
      component: require('@/components/error/Error404').default
    }
  ]
})


export default router