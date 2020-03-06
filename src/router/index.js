import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/editor.vue'
import Profile from '@/components/profile.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'editor'
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    }
  ]
})
