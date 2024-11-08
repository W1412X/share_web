import { createRouter, createWebHashHistory } from 'vue-router';
//import { getCookie,/*setCookie*/ } from '@/utils/cookie';
/*import { login } from '@/utils/api';*/
import { getUser } from '@/utils/storage';
const routes = [
  {
    path:'/',
    //redirect:'/index',
    name:'WelcomePage',
    component:(()=>import('@/pages/WelcomePage.vue'))
  },
  {
    path:'/intro',
    name:'IntroducePage',
    component:(()=>import('@/pages/IntroducePage.vue'))
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: (()=>import('@/pages/LoginPage.vue')),
  },
  {
    path: '/index',
    name: 'IndexPage',
    component: (()=>import('@/pages/IndexPage.vue')),
    meta: { requiresAuth: true },
  },
  {
    path: '/self/:name',
    name: 'SelfPage',
    component: (()=>import('@/pages/SelfPage.vue')),
    meta: { requiresAuth: true },
  },
  {
    path: '/article/:id/:from?',
    name: 'ArticlePage',
    component: (()=>import('@/pages/ArticlePage.vue')),
    meta: { requiresAuth: true },
  },
  {
    path:'/editor/:id?',
    name:'EditorPage',
    component: (()=>import('@/pages/EditorPage.vue')),
    meta: { requiresAuth: true },
  },
  {
    path: '/components',
    name: 'ComponentsPage',
    component: (()=>import('@/pages/ComponentsPage.vue')),
    meta: { requiresAuth: true },
  },
  {
    path: '/question/:id/:from?',
    name:'QuestionPage',
    component: (()=>import('@/pages/QuestionPage.vue')),
    meta: { requiresAuth: true },
  },
  {
    path:'/author/:name',
    name:'AuthorPage',
    component: (()=>import('@/pages/AuthorPage.vue')),
    meta: { requiresAuth: true },
  },
  {
    path:'/course/:id',
    name:'CoursePage',
    component: (()=>import('@/pages/CoursePage.vue')),
    meta:{requiresAuth:true}
  },
  {
    path:'/mdeditor/:id?',
    name:'MdEditorPage',
    component:(()=>import('@/pages/MdEditorPage.vue')),
  },
  {
    path:'/manage',
    name:'ManagePage',
    component:(()=>import('@/pages/ManagePage.vue')),
  },
  {
    path:'/mobilearticle',
    name:'MobileArticlePage',
    component:(()=>import('@/pages/MobileArticlePage.vue')),
  },
  {
    path:'/document',
    name:'DocumentPage',
    component:(()=>import('@/pages/DocumentPage.vue')),
  },
  {
    path:'/error/:reason?',
    name:'ErrorPage',
    component: (()=>import('@/pages/ErrorPage.vue')),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error'
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// 路由守卫，用于检查登录状态
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(getUser(''));
    if(getUser()!=''){//如果存储了用户信息则直接尝试登陆
      console.log(to.path);
      if(to.path=="/login"){
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
