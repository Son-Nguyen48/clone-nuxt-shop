export const state = () => ({
  isLogin: false,
})

export const getters = {
  getState(state) {
    return state.isLogin
  },
}

export const mutations = {
  setStateLogin(state, payload) {
    state.isLogin = payload
  },
}
