import { createRouter, createWebHistory } from 'vue-router'
import {allCurrencies ,allPairs} from '../service/Route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: import('../views/Layout.vue'),
      // verifier si l'utilisateur est connecté avant d'accéder a une route de l'interface admin
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('moneyValueToken')) {
          router.push("/login")
        }else{
          next()
        }
      },
      children: [
        { path: '', component: () => import('../views/CurrencyView/CurrencyView.vue') },
        {
          path: '/admin/devise',
          name: 'currency',
          component: () => import('../views/CurrencyView/CurrencyView.vue')
        },
        {
          path: '/admin/pairs',
          name: 'pairs',
          component: () => import('../views/PairView/PairView.vue')
        },
        {
          path: '/admin/statistics',
          name: 'statistics',
          component: () => import('../views/StatisticView.vue')
        },
      ]
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Conversion.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]

})


// toutes les pages de l'application on besoin des monnaies 
// et des pair de monnaie pour fonctionner .
// ici beforeEach vérifie si elles sont présente dans le localStorage 
// sinon elle les récupère via un fetch
router.beforeEach( async (to, from, next) => {
  if (!localStorage.getItem("moneyValueCurrencies") ) {
    let res = await allCurrencies.getResponse();
    localStorage.setItem("moneyValueCurrencies", JSON.stringify(res.data))
  }

  if (!localStorage.getItem("moneyValuePairs") ) {
    let res = await allPairs.getResponse();
    localStorage.setItem("moneyValuePairs", JSON.stringify(res.data))
  }

  next()

})

export default router
