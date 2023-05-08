export const state = () => ({
  collection: {},
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
}

export const actions = {
  getCollection(vuexContext, payload) {
    return this.$axios.$get(`/collections/${payload}`).then((res) => {
      // eslint-disable-next-line no-console
      vuexContext.commit('setCollection', res)
    })
  },
}
