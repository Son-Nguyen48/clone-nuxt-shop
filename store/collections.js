export const state = () => ({
  collection: {},
  listProduct: [],
})

export const getters = {
  all(state) {
    return state.collection
  },
  products(state) {
    return state.listProduct
  },
}

export const mutations = {
  setCollection(state, payload) {
    state.collection = payload
  },
  setListProduct(state) {
    state.listProduct = state.collection?.listProduct
  },
}

export const actions = {
  getCollection(vuexContext, payload) {
    return this.$axios.$get(`/collections/${payload}`).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res, 'res', payload, 'payload')
      // eslint-disable-next-line no-console
      console.log(res, 'res')
      // eslint-disable-next-line no-console
      vuexContext.commit('setCollection', res)
      vuexContext.commit('setListProduct')
    })
  },
}
