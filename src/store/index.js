import { createStore } from 'vuex';
const store = createStore({
  state: {
    user: {
      id:'00000000',
      name:'visitor',
      cookie:'None',
    }
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
    },
    getUserId(state){
      return state.user.id;
    }
  }
});
export default store;
