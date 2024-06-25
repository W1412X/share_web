import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/Index/App.vue'
import Self from '../pages/Self/App.vue'
const routes = [
  {
    path: '/Index',
    name: 'Index',
    component: Index
  },
  {
    path: '/Self',
    name: 'Self',
    component: Self
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router