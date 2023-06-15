import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      alias: '/admin',
      component: import('../views/Layout.vue'),
      beforeEnter: () => {
        if(!localStorage.getItem('moneyValueToken')){
          router.push("/login")
        }
      },
      children: [
        { path: '', component: () => import('../views/Conversion.vue') },
        {
          path: '/devise',
          name: 'currency',
          component: () => import('../views/CurrencyView.vue')
        },
        {
          path: '/conversion',
          name: 'conversion',
          component: () => import('../views/Conversion.vue')
        },
      ]
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
