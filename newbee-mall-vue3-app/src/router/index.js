import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { getLocal } from '@/common/js/utils'

const authRoutes = ['user', 'cart', 'order', 'order-detail', 'create-order', 'address', 'address-edit', 'setting']

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        index: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User.vue'),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/product-list',
      name: 'product-list',
      component: () => import('@/views/ProductList.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/Category.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/ProductDetail.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart.vue'),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/create-order',
      name: 'create-order',
      component: () => import('@/views/CreateOrder.vue'),
      meta: {
        index: 2,
        requiresAuth: true
      }
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('@/views/Address.vue'),
      meta: {
        index: 2,
        requiresAuth: true
      }
    },
    {
      path: '/address-edit',
      name: 'address-edit',
      component: () => import('@/views/AddressEdit.vue'),
      meta: {
        index: 3,
        requiresAuth: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order.vue'),
      meta: {
        index: 2,
        requiresAuth: true
      }
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: () => import('@/views/OrderDetail.vue'),
      meta: {
        index: 3,
        requiresAuth: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting.vue'),
      meta: {
        index: 2,
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      meta: {
        index: 2
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const hasToken = !!getLocal('token')
  if (to.meta.requiresAuth && !hasToken) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
