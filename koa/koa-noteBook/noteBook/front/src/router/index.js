import Vue from 'vue'
import Router from 'vue-router'
import StarNotes from '@/components/StarNotes.vue'
import StarBanner from '@/components/StarBanner/StarBanner.vue'
import StarLogin from '@/components/login/StarLogin.vue'
import StarRegister from '@/components/register/StarRegister.vue'
import noteClass from '@/components/noteClass/noteClass.vue'

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
    },
    {
      path: '/StarRegister',
      name: 'StarRegister',
      component: StarRegister,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/noteClass',
      name: 'noteClass',
      component: noteClass,
      meta: {
        title: '笔记分类'
      }
    }
  ]
})
