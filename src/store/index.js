import { createStore } from 'vuex';
const store = createStore({
  state: {
    user: null // 初始状态为空
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
});

export default store;
