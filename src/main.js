// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createStore } from 'vuex';
import { setCookie,getCookie, clearCookie } from './utils/cookie';
const vuetify = createVuetify({
  components,
  directives,
})
const store=createStore({
  state: {//状态存储
    user: null,
    authToken: getCookie('authToken'),
  },
  getters: {//计算逻辑
    isLoggedIn: (state) => !!state.authToken
  },
  mutations: {//修改state的唯一路径，定义所有修改用户状态的方法
    setUser(state, user) {
      state.user = user
    },
    setAuthToken(state, token) {
      state.authToken = token;
      setCookie('authToken',token);
    },
    clearUser(state) {
      state.user = null
      state.authToken = null;
      clearCookie('authToken');
    }
  },
  actions: {//处理异步操作的集合
    login({ commit }, user) {
        commit('setUser',user);
        commit('setAuthToken','test_cookie');
    },
    logout({ commit }) {
      commit('clearUser')
    }
  }
});
createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app');