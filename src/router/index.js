import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/IndexPage.vue'
import SelfPage from '../pages/SelfPage.vue'
import LoginPage from '../pages/LoginPage.vue'
const routes = [
  {
    path: '/',
    component: LoginPage,
  },
  {
    path: '/index',
    name: 'IndexPage',
    component: IndexPage
  },
  {
    path: '/self',
    name: 'SelfPage',
    component: SelfPage
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router