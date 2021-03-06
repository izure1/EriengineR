import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router

router = new Router({
  routes: [{
      path: '/engine',
      component: require('@/components/Engine/Component').default
    },
    {
      path: '/project-manager',
      component: require('@/components/ProjectManager/Component').default,
      meta: {
        title: '프로젝트 관리자'
      }
    },
    {
      path: '',
      redirect: '/project-manager'
    },
    {
      path: '*',
      component: require('@/components/Error404/Component').default
    }
  ]
})


// 라우팅이 일어나기 전에 해야할 일을 지정합니다
router.beforeEach((to, from, next) => {

  // 창의 제목을 바꿉니다
  let meta
  let title

  meta = to.meta || {}
  title = meta.title || document.title

  document.title = title
  next()

})


export default router