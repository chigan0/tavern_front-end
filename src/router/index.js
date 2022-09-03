import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import HomeView from '@/views/HomeView.vue';
import CatalogView from '@/views/CatalogView.vue';
import SignView from '@/views/SignView.vue';
import VkAuth from '@/views/VkAuth.vue';
import BasketViews from '@/views/BasketViews.vue';
import ProductPage from '@/views/ProductPage.vue';
import AdminPanelViews from '@/views/AdminPanelViews.vue';
import OrdersHistory from '@/views/OrdersHistory.vue';
import OrderResult from '@/views/OrderResult.vue';
import NotFound from '@/views/NotFound.vue';


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: '/sign',
    name: 'sign',
    component: SignView,
    beforeEnter: (to, from, next)=> {
      let auth = store.getters.AUTH_STATE;
      if (!auth)
        next();
      else
        next('/catalog');
    }
  },
  {
    path: '/sign/vk',
    name: "vk_sign",
    component: VkAuth,
    beforeEnter: (to, from, next)=> {
      let auth = store.getters.AUTH_STATE;
      if (!auth)
        next();
      else
        next('/catalog');
    }
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/product/:id',
    name: 'product_page',
    component: ProductPage
  },
  {
    path: '/oreders/result/:orderNumber',
    name: 'order_result',
    meta: {auth: true},
    component: OrderResult
  },
  {
    path: '/basket',
    name: 'basket',
    component: BasketViews
  },
  {
    path: '/admin',
    name: 'admin_panel',
    meta: {auth: true,},
    component: AdminPanelViews,
    beforeEnter: (to, from, next)=> {
      let adminPanel = store.getters.ADMIN_PANEL;
      if (adminPanel)
        next()

      else
        next('/catalog')
    }
  },
  {
    path: '/orders',
    name: 'orders_history',
    meta: {auth: true},
    component: OrdersHistory
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) =>{
  let auth = store.getters.AUTH_STATE;
  let requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !auth)
    next('/catalog')
  else
    next()
})


export default router
