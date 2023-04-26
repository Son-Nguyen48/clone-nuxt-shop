export const state = () => ({
  listProduct: {},
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
  getListProduct(vuexContext, payload) {
    return this.$axios.$get(`/products/${payload}`).then((res) => {
      vuexContext.commit('store', res)
    })
  },
  getListProducts(vuexContext) {
    return this.$axios.$get('/products').then((res) => {
      vuexContext.commit('store', res)
    })
  },
}
