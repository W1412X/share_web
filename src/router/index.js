import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '../pages/IndexPage.vue';
import SelfPage from '../pages/SelfPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import ArticlePage from '@/pages/ArticlePage.vue';
import { getCookie,/*setCookie*/ } from '@/utils/cookie';
/*import { login } from '@/utils/api';*/
import TestPage2 from '@/pages/TestPage2.vue';
import EditorPage from '@/pages/EditorPage.vue';
import QuestionPage from '@/pages/QuestionPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';
import AuthorPage from '@/pages/AuthorPage.vue';
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
  {
    path:'/editor',
    name:'EditorPage',
    component: EditorPage,
  },
  {
    path: '/test2',
    name: 'TestPage2',
    component: TestPage2,
  },
  {
    path: '/question',
    name:'QuestionPage',
    component: QuestionPage
  },
  {
    path:'/error',
    name:'ErrorPage',
    component: ErrorPage
  },
  {
    path:'/author',
    name:'AuthorPage',
    component: AuthorPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫，用于检查登录状态
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //需要认证的页面
    if(getCookie('user_id')==null){//如果不存在会话临时cookie，则尝试使用cookie登陆并获取临时cookie
      if (getCookie('cookie')==null || getCookie('cookie')=='') {//不存在cookie，则需要登陆
        // 如果用户未登录，则重定向到登录页面
        window.alert('未登陆');
        router.push({name:'LoginPage'});
      } else {
        next();
        /*const data={
          'type':'cookie',
          'cookie':getCookie('cookie')
        }
        login(data)
        .then(data=>{
          if(data.state=='Y'){
            window.alert(data.user_id);
            setCookie('user_id',data.user_id);
          }else{
            window.alert('登陆状态已过期，请重新登陆');
            router.push({name:'LoginPage'});
          }
        })
        .catch(error=>{
          window.alert(error);
          router.push({name:'LoginPage'});
        })
        //进入界面
        next();*/
      }
    }else{//如果存在，就直接跳转
      next();
    }
  } else {
    next();
  }
});

export default router;
