export const state = () => ({
  item: {},
  items: [],
  itemsFilter: [],
})

export const getters = {
  item: (s) => s.productItem,
  items: (s) => s.productItems,
  itemsFilter: (s) => s.itemsFilter,
}

export const mutations = {
  setProductItem(state, payload) {
    state.item = payload
  },
  setProductItems(state, payload) {
    state.items = payload
  },
  setProductFilter(state, payload) {
    // eslint-disable-next-line no-console
    state.itemsFilter = payload
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
    const url = `/${payload}`
    return await this.$axios.$get(url).then((res) => {
      vuexContext.commit('setProductFilter', res)
      // eslint-disable-next-line no-console
      console.log(res)
    })
  },
}
