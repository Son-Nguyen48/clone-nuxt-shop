export const state = () => ({
  productItem: {},
  productItems: [],
  productFilter: [],
})

export const getters = {
  productItem: (s) => s.productItem,
  productItems: (s) => s.productItems,
  productFilter: (s) => s.productFilter,
}

export const mutations = {
  setProductItem(state, payload) {
    state.productItem = payload
  },
  setProductItems(state, payload) {
    state.productItems = payload
  },
  setProductFilter(state, payload) {
    // eslint-disable-next-line no-console
    state.productFilter = payload
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
  async getListFilter(vuexContext, payload) {
    const url = payload
      ? `/products?${payload.name}=${payload.data}`
      : '/products'
    return await this.$axios.$get(url).then((res) => {
      vuexContext.commit('setProductFilter', res)
      // eslint-disable-next-line no-console
      console.log(res)
    })
  },
}
