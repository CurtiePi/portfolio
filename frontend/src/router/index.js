import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../components/About.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../components/Contact.vue')
    },
    {
      path: '/admin/contactlist',
      name: 'ContactList',
      component: () => import('../components/ContactList.vue')
    },
    {
      path: '/admin/createmail',
      name: 'CreateMessage',
      component: () => import('../components/CreateMessage.vue')
    },
    {
      path: '/admin/post',
      name: 'AdminPosts',
      component: () => import('../components/Posts.vue')
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
