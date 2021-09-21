import { createWebHistory, createRouter } from 'vue-router'
import store from '../store/index'

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
      path: '/admin/articlelist',
      name: 'ArticleList',
      component: () => import('../components/ArticleList.vue'),
    },
    {
      path: '/admin/createarticle',
      name: 'CreateArticle',
      component: () => import('../components/CreateArticle.vue'),
      props: true
    },
    {
      path: '/admin/editarticle',
      name: 'EditArticle',
      component: () => import('../components/EditArticle.vue'),
      props: true
    },
    {
      path: '/admin/servicelist',
      name: 'ServiceList',
      component: () => import('../components/ServiceList.vue')
    },
    {
      path: '/admin/createservice',
      name: 'CreateService',
      component: () => import('../components/CreateService.vue'),
      props: true
    },
    {
      path: '/admin/serviceDetail',
      name: 'ServiceDetail',
      component: () => import('../components/ServiceDetail.vue'),
      props: true
    },
    {
      path: '/admin/createmail',
      name: 'CreateMessage',
      component: () => import('../components/CreateMessage.vue'),
      props: true
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

router.beforeEach((to, _, next) => {
  console.log(`Logged in: ${store.getters.isAuth}`)
  if (to.path.includes('/admin') && !store.getters.isAuth) {
      console.log(`Logged in: ${store.getters.isAuth}`)
      next({ name: 'Home' })
  } else {
    next()
  }
})


export default router
