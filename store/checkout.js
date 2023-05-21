export const state = () => ({
  orders: [],
})

export const getters = {
  orders: (s) => s.orders,
  itemsQuantity: (s) => s.orders.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: (s) =>
    s.orders.reduce((sum, i) => sum + i.quantity * +i.product.price, 0),
}

export const mutations = {
  setOrders(state, payload) {
    state.orders = payload
  },
}

export const actions = {
  async getOrders(vuexContext) {
    await this.$axios.$get('/orders').then((res) => {
      vuexContext.commit('setOrders', res)
    })
  },

  async addOrders(vuexContext, payload) {
    // const ordersItems = payload.cartItems.map((item) => {
    //   return { id: item.id, quantity: item.quantity }
    // })
    console.log(payload, 'payload')

    await this.$swal.fire(
      'Great!',
      'Your order has been updated! You will be redirected to your order page!',
      'success'
    )

    await this.$axios.$post('/orders', {
      name: payload.form.name,
      address: payload.form.address,
      phone: payload.form.phone,
      email: payload.form.email,
      paymentsMethods: payload.form.paymentsMethods,
      totalPayment: payload.form.totalPayment,
      orderStatus: 'pending',
      order_date: payload.form.order_date.toUTCString(),
      cartItems: payload.cartItems,
    })

    this.$router.push('/account/user?idTab=2')
  },
}
