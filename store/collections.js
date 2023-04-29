export const state = () => ({
  collection: {},
})

export const getters = {
  all(state) {
    return state.collection
  },
}

export const mutations = {
  setCollection(state, payload) {
    state.collection = payload
  },
}

export const actions = {
  getCollection(vuexContext, payload) {
    return this.$axios.$get('/collections').then((res) => {
      // eslint-disable-next-line no-console
      console.log(res, 'res', payload, 'payload')
      const result = res[payload]
      // eslint-disable-next-line no-console
      console.log(result, 'result')
      vuexContext.commit('setCollection', result)
    })
  },
}
