export const state = () => ({
  listProduct: [],
})

export const getters = {
  listBestseller(state) {
    return state.listProduct
  },
}

export const mutations = {
  store(state, payload) {
    state.listProduct = payload
  },
}

export const actions = {
  getListProduct(vuexContext) {
    return this.$axios.$get('/bestsellers?_page=1&_limit=15').then((res) => {
      vuexContext.commit('store', res)
    })
  },
}
