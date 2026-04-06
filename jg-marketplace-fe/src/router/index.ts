import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import AppLayout from '../layouts/AppLayout.vue'
import { useAuthStore } from '../stores/auth'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import AdminProducts from '../views/AdminProducts.vue'
import ProductMng from '../views/ProductMng.vue'
import AdminUsers from '../views/AdminUsers.vue'
import UserMng from '../views/UserMng.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/', component: AppLayout,
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/product/:id', component: ProductDetail },
      { path: '/cart', component: Cart },
      { path: '/admin-products', component: AdminProducts },
      { path: '/product-mng/:id', component: ProductMng },
      { path: '/admin-users', component: AdminUsers },
      { path: '/user-mng/:id', component: UserMng },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('Navigating from:', from.path, 'to:', to.path);
  const auth = useAuthStore()
  const isPublic = to.path === '/'
  if (!isPublic && !auth.token) {
    next('/')
  } else {
    next()
  }
})

export default router