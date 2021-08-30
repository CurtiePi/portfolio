import { createStore } from 'vuex'
import sharedMutations from 'vuex-shared-mutations'

export default createStore({
  state: {
    isAuth: false,
    userId: null,
    token: null,
    tokenExpiry: null,
    refresh: {
        contacts: false,
        articles: false
    }
  },
  getters: {
    isAuth: state => {
        return state.isAuth
    },
    getToken: state => {
        return state.token
    },
    getUserId: state => {
        return state.userId
    },
    getExpiry: state => {
        return state.tokenExpiry
    },
    getRefresh: (state) => (type) => {
      return state.refresh[type]
    }
  },
  mutations: {
    setAuth(state, authData) {
      state.isAuth = true
      state.token = authData.token
      state.userId = authData.userId
      state.tokenExpiry = authData.tokenExpiry
    },
    clearAuth(state) {
      state.isAuth = false
      state.token = null
      state.userId = null
      state.tokenExpiry = null
    },
    scheduleRefresh(state, payload) {
        state.refresh[payload.type] = true
    },
    clearRefresh(state, payload) {
        state.refresh[payload.type] = false
    }
  },
  plugins: [sharedMutations({ predicate:['sheduleRefresh', 'clearRefresh'] })]
})
