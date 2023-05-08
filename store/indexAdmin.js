export const state = () => ({
  itemsFilter: [],
})

export const getters = {
  getState(state) {
    return state.itemsFilter
  },
}

export const mutations = {
  setItems(state, payload) {
    state.itemsFilter = payload
    // eslint-disable-next-line no-console
    console.log(payload, 'payload ||||||', state.itemsFilter, 'items')
  },
}

export const actions = {
  getItems(vuexContext, payload) {
    return this.$axios.$get(`/${payload}/`).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res, 'res')
      vuexContext.commit('setItems', res)
    })
  },
}
