export const state = () => ({
  filters: [],
})

export const getters = {
  all(state) {
    return state.filters
  },
}

export const mutations = {
  setFilters(state, payload) {
    state.filters = payload
  },
}

export const actions = {
  getFilters(vuexContext) {
    return this.$axios.$get('/filterOptions').then((res) => {
      // eslint-disable-next-line no-console
      console.log(res, 'res')
      const result = res
      // eslint-disable-next-line no-console
      console.log(result, 'result')
      vuexContext.commit('setFilters', result)
    })
  },
}
