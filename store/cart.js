export const state = () => ({
  listProduct: [],
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
  async deleteCartItem(state, payload) {
    await this.$axios.delete(`localhost:3004/cart/${payload}`).then((res) => {
      const selectedIndex = state.listProduct.findIndex(
        (product) => product.id === payload
      )
      if (selectedIndex !== -1) {
        state.listProduct.splice(selectedIndex, 1)
      }
    })
  },
}

export const actions = {
  getListProduct(vuexContext) {
    return this.$axios.$get('/cart').then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
      vuexContext.commit('store', res)
    })
  },
}
