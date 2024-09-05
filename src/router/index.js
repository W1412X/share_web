import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../pages/IndexPage.vue';
import SelfPage from '../pages/SelfPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import ArticlePage from '@/pages/ArticlePage.vue';
//import { getCookie,/*setCookie*/ } from '@/utils/cookie';
/*import { login } from '@/utils/api';*/
import { getUser } from '@/utils/storage';
import ComponentsPage from '@/pages/ComponentsPage.vue';
import EditorPage from '@/pages/EditorPage.vue';
import QuestionPage from '@/pages/QuestionPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';
import AuthorPage from '@/pages/AuthorPage.vue';
import CoursePage from '@/pages/CoursePage.vue';
const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path: '/login',
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
    path: '/self/:name',
    name: 'SelfPage',
    component: SelfPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/article/:id/:from?',
    name: 'ArticlePage',
    component: ArticlePage,
    meta: { requiresAuth: true },
  },
  {
    path:'/editor',
    name:'EditorPage',
    component: EditorPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/components',
    name: 'ComponentsPage',
    component: ComponentsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/question/:id/:from?',
    name:'QuestionPage',
    component: QuestionPage,
    meta: { requiresAuth: true },
  },
  {
    path:'/error/:reason',
    name:'ErrorPage',
    component: ErrorPage
  },
  {
    path:'/author/:name',
    name:'AuthorPage',
    component: AuthorPage,
    meta: { requiresAuth: true },
  },
  {
    path:'/course/:id',
    name:'CoursePage',
    component: CoursePage,
    meta:{requiresAuth:true}
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫，用于检查登录状态
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(getUser(''));
    if(getUser()!=''){//如果存储了用户信息则直接尝试登陆
      console.log(to.path);
      if(to.path=="/" || to.path=="/login"){
        router.push('/index');
        return;
      }
      next();
    }else{//否则跳转到登陆界面 
      window.alert('未登录');
      router.push('/login');
    }
  }else{
    next();
  }
});

export default router;
