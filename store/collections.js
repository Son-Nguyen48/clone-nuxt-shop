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
    return this.$axios.$get('/collections').then((res) => {
      // eslint-disable-next-line no-console
      console.log(res, 'res', payload, 'payload')
      const result = res.find((item) => payload in item)
      // eslint-disable-next-line no-console
      console.log(result, 'result')
      vuexContext.commit('store', result)
    })
  },
}
