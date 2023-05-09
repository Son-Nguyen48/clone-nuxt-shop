export const state = () => ({
  cartItems: [],
})

export const getters = {
  cartItems: (s) => s.cartItems,
  itemsQuantity: (s) => s.cartItems.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: (s) =>
    s.cartItems.reduce((sum, i) => sum + i.quantity * +i.product.price, 0),
}

export const mutations = {
  addToCart(state, payload) {
    const addedItem = state.cartItems.find((i) => i.id === payload.id)
    if (addedItem) {
      state.cartItems = state.cartItems.map((i) =>
        i.id === payload.id ? payload : i
      )
    } else state.cartItems = state.cartItems.concat(payload)
  },
  setCartItem(state, payload) {
    state.cartItems = payload
  },

  updateQuantity(state, payload) {
    const quantity = +state.cartItems[payload.index].quantity
    if (payload.type === 'sub')
      state.cartItems[payload.index].quantity = quantity - 1
    else if (payload.type === 'add')
      state.cartItems[payload.index].quantity = quantity + 1
    else {
      state.cartItems[payload.index].quantity =
        +payload.quantity >= 0 ? +payload.quantity : 0
    }
  },
}

export const actions = {
  async getListItem(vuexContext) {
    await this.$axios.$get('/cart').then((res) => {
      vuexContext.commit('setCartItem', res)
    })
  },

  async removeItem(vuexContext, payload) {
    await this.$axios.$delete(`/cart/${payload}`).then((res) => {
      this.$axios.$get('/cart').then((res) => {
        vuexContext.commit('setCartItem', res)
      })
    })
  },

  async updateCart(vuexContext, payload) {
    for (let index = 0; index < payload.length; index++) {
      await this.$axios.$patch(`/cart/${payload[index].id}`, {
        quantity: payload[index].quantity,
      })
    }
  },

  async checkoutCart(vuexContext, payload) {
    if (localStorage.getItem('currentUser')) {
      for (let index = 0; index < payload.length; index++) {
        await this.$axios.$patch(`/cart/${payload[index].id}`, {
          quantity: payload[index].quantity,
        })
      }
      this.$router.push('/checkout')
    } else {
      this.$router.push('/account/login')
    }
  },
}
