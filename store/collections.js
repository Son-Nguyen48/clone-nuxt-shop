export const state = () => ({
  collection: {},
  listFilter: [],
})

export const getters = {
  listProduct(state) {
    return state.collection?.listProduct
  },
}

export const mutations = {
  setCollection(state, payload) {
    state.collection = payload
  },
  setProductFilter(state, payload) {
    state.listFilter = payload
  },
}

export const actions = {
  getCollection(vuexContext, payload) {
    return this.$axios.$get(`/collections/${payload}`).then((res) => {
      // eslint-disable-next-line no-console
      vuexContext.commit('setCollection', res)
    })
  },

  async getListFilter(vuexContext, payload) {
    const url = payload
      ? `/collections/${payload.paramsId}/?${payload.name}=${payload.data}`
      : `/collections/${payload.name}`
    return await this.$axios.$get(url).then((res) => {
      vuexContext.commit('setProductFilter', res)
    })
  },
}
