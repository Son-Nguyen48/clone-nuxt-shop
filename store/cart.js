// import Swal from 'sweetalert2'

export const state = () => ({
  cartItems: [],
  deleteId: [],
})

export const getters = {
  cartItems: (s) => s.cartItems,
  itemsQuantity: (s) => s.cartItems.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: (s) =>
    s.cartItems.reduce((sum, i) => sum + i.quantity * +i.product.price, 0),
  deleteId: (s) => s.deleteId,
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

  removeItem(state, payload) {
    state.cartItems.splice(payload, 1)
  },

  setDeleteId(state, payload) {
    if (payload) {
      state.deleteId.push(payload)
      console.log(payload, 'payload', state.deleteId, 'deleteId')
    } else {
      state.deleteId = []
    }
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

  setQuantity(state, payload) {
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

  async removeItem({ state, commit }, payload) {
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
          const indexDelete = state.cartItems.findIndex(
            (obj) => obj.id === payload
          )
          commit('removeItem', indexDelete)
          commit('setDeleteId', payload)
          // this.$axios.$delete(`/cart/${payload.id}`)
          this.$swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
  },

  async updateCart(vuexContext, payload) {
    console.log(payload, 'payload')
    for (let index = 0; index < payload.deleteId.length; index++) {
      await this.$axios.$delete(`/cart/${payload.deleteId[index]}`)
    }
    for (let index = 0; index < payload.cartItems.length; index++) {
      await this.$axios.$patch(`/cart/${payload.cartItems[index].id}`, {
        quantity: payload.cartItems[index].quantity,
      })
    }

    vuexContext.commit('setDeleteId')

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

  async updateQuantity({ state, commit }, payload) {
    console.log(payload, 'payload')
    console.log(state.cartItems[payload.index], 'state index')
    const stateIndex = state.cartItems[payload.index]
    console.log(stateIndex.product.id, 'stateIndex.product.id')

    const currentProduct = await this.$axios.$get(
      `/products/${stateIndex.product.id}`
    )
    const currentQuantity = stateIndex.product.quantity
    const productQuantity = Number(currentProduct.quantity)
    console.log(state, 'state')
    console.log(currentQuantity, 'currentQuantity')
    console.log(productQuantity, 'productQuantity')
    if (
      Number(productQuantity) >= 1 ||
      Number(productQuantity) > Number(payload?.quantity)
    ) {
      commit('updateQuantity', payload)
      await this.$axios.$patch(`/products/${stateIndex.product.id}`, {
        quantity:
          payload.type === 'add'
            ? String(productQuantity - 1)
            : payload.type === 'sub'
            ? String(productQuantity + 1)
            : String(currentQuantity - payload?.quantity),
      })
    } else {
      if (payload.type === 'sub') {
        commit('updateQuantity', payload)
        await this.$axios.$patch(`/products/${stateIndex.product.id}`, {
          quantity: String(productQuantity + 1),
        })
      }

      if (payload.type !== 'sub') {
        await this.$swal.fire(
          'This product quantity is empty!',
          'Wait until stock is back !',
          'error'
        )
      }
    }
  },
}
