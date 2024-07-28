import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../pages/IndexPage.vue';
import SelfPage from '../pages/SelfPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import ArticlePage from '@/pages/ArticlePage.vue';
import { getCookie } from '@/utils/cookie';
const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/index',
    name: 'IndexPage',
    component: IndexPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/self',
    name: 'SelfPage',
    component: SelfPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/article',
    name: 'ArticlePage',
    component: ArticlePage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫，用于检查登录状态
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //需要认证的页面
    if (getCookie('cookie')==null || getCookie('cookie')=='') {
      // 如果用户未登录，则重定向到登录页面
      window.alert('未登陆');
      next({name:'LoginPage'});
    } else {
      //进入界面
      next();
    }
  } else {
    //登陆界面，可以直接访问
    next();
  }
});

export default router;
