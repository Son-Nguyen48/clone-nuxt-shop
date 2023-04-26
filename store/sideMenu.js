export const state = () => ({
  isSideMenuOpen: false,
  sideMenuId: '',
})

export const getters = {
  getState(state) {
    return state.isSideMenuOpen
  },
}

export const mutations = {
  setStateSideMenu(state) {
    state.isSideMenuOpen = !state.isSideMenuOpen
  },

  hideSideMenu(state) {
    state.isSideMenuOpen = false
  },

  setSideMenuId(state, payload) {
    state.sideMenuId = payload
  },
}

export const actions = {
  setStateSideMenu(vuexContext) {
    vuexContext.commit('setStateSideMenu')
  },

  hideSideMenu(vuexContext, payload) {
    vuexContext.commit('hideSideMenu', payload)
  },

  setSideMenuId(vuexContext, payload) {
    vuexContext.commit('setSideMenuId', payload)
  },
}
