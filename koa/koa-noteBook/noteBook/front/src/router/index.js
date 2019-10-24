import Vue from 'vue'
import Router from 'vue-router'
import StarNotes from '@/components/StarNotes.vue'
import StarBanner from '@/components/StarBanner/StarBanner.vue'
import StarLogin from '@/components/login/StarLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StarNotes',
      component: StarNotes,
      meta: {
        title: '星辰笔记'
      }
    },
    {
      path: '/StarBanner',
      name: 'StarBanner',
      component: StarBanner,
      meta: {
        title: '欢迎'
      }
    },
    {
      path: '/StarLogin',
      name: 'StarLogin',
      component: StarLogin,
      meta: {
        title: '登录'
      }
    }
  ]
})
