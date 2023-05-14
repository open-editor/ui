import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUpPage.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/forgot-password-message',
      name: 'forgot-password-message',
      component: () => import('../views/ForgotPasswordMessageView.vue')
    },
    {
      path: '/home-page',
      name: 'home-page',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sheet-page',
      name: 'sheet-page',
      component: () => import('../views/SheetView.vue')
    },
  ]
})

export default router
