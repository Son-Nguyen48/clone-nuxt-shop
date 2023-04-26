export const state = () => ({
  listProduct: [],
})

export const getter = {
  all(state) {
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
    return this.$axios.$get('/bestsellers').then((res) => {
      vuexContext.commit('store', res)
    })
  },
}
