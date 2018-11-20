import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router

router = new Router({
  routes: [
    {
      path: '/engine',
      component: require('@/components/engine/Engine').default
    },
    {
      path: '/script-editor',
      component: require('@/components/script-editor/ScriptEditor').default
    },
    {
      path: '/',
      redirect: '/engine'
    },
    {
      path: '*',
      component: require('@/components/error/Error404').default
    }
  ]
})


export default router