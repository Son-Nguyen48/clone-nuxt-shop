export const state = () => ({
  productItem: {},
  productItems: [],
})

export const getters = {
  productItem: (s) => s.productItem,
  productItems: (s) => s.productItems,
}

export const mutations = {
  setProductItem(state, payload) {
    state.productItem = payload
  },
  setProductItems(state, payload) {
    state.productItems = payload
  },
}

export const actions = {
  getProduct(vuexContext, payload) {
    return this.$axios.$get(`/products/${payload}`).then((res) => {
      vuexContext.commit('setProductItem', res)
    })
  },
  getListProducts(vuexContext) {
    return this.$axios.$get('/products').then((res) => {
      vuexContext.commit('setProductItems', res)
    })
  },
}
