import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router

router = new Router({
  routes: [{
      path: '/engine',
      component: require('@/components/engine/Engine').default
    },
    {
      path: '/macro/:group/:path',
      component: require('@/components/macro/Macro').default
    },
    {
      path: '/project-manager',
      component: require('@/components/project-manager/ProjectManager').default
    },
    {
      path: '',
      redirect: '/project-manager'
    },
    {
      path: '*',
      component: require('@/components/error/Error404').default
    }
  ]
})


export default router