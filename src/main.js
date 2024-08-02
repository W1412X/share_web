// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createStore } from 'vuex';
import { setCookie,getCookie, clearCookie } from './utils/cookie';//cookie服务
const vuetify = createVuetify({
  components,
  directives,
})
const store=createStore({
  state: {//状态存储
    user: null,
    cookie: getCookie('cookie'),
  },
  getters: {//计算逻辑
    isLoggedIn: (state) => !!state.cookie
  },
  mutations: {//修改state的唯一路径，定义所有修改用户状态的方法
    setUser(state, user) {
      state.user = user
    },
    setcookie(state, cookie) {
      state.cookie = cookie;
      setCookie('cookie',cookie,1);
    },
    clearUser(state) {
      state.user = null
      state.cookie = null;
      clearCookie('cookie');
      clearCookie('user_id');
    }
  },
  actions: {//处理异步操作的集合
    storeLogin({ commit }, IdCookie) {
        commit('setUser',IdCookie.id);
        commit('setcookie',IdCookie.cookie);
    },
    storeLogout({ commit }) {
      commit('clearUser')
    }
  }
});
const app=createApp(App);
app.use(router)
  .use(vuetify)
  .use(store)
  .mount('#app');