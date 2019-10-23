import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register';
import Login from '@/components/Login';
import Me from '@/components/Me';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
  ]
})
