// import Swal from 'sweetalert2'

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
    console.log(payload, 'payload')
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
  async getListItem(vuexContext, payload) {
    await this.$axios.$get('/cart').then((res) => {
      const result = res.filter((item) => {
        return item.userId === payload
      })
      console.log(result, 'result')
      vuexContext.commit('setCartItem', result)
    })
  },

  async removeItem(vuexContext, payload) {
    await this.$swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.$axios.$delete(`/cart/${payload}`).then((res) => {
            this.$axios.$get('/cart').then((res) => {
              vuexContext.commit('setCartItem', res)
            })
          })
          this.$swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
  },

  async updateCart(vuexContext, payload) {
    for (let index = 0; index < payload.length; index++) {
      await this.$axios.$patch(`/cart/${payload[index].id}`, {
        quantity: payload[index].quantity,
      })
    }

    await this.$swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your cart has been updated',
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    })
  },

  async checkoutCart(vuexContext, payload) {
    if (localStorage.getItem('currentUser')) {
      for (let index = 0; index < payload.length; index++) {
        await this.$axios.$patch(`/cart/${payload[index].id}`, {
          quantity: payload[index].quantity,
        })
      }

      await this.$swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your cart has been updated',
        showConfirmButton: false,
        toast: true,
        timer: 1500,
      })
      this.$router.push('/checkout')
    } else {
      await this.$swal.fire(
        'You need to login first',
        'Click to go to login page!',
        'error'
      )
      this.$router.push('/account/login')
    }
  },
}
