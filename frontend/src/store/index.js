import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuth: false,
    userId: null,
    token: null,
    tokenExpiry: null
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
    }
  }
})
