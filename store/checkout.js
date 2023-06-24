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
      orderStatus:
        payload.form.paymentsMethods === 'transfer_payments'
          ? 'wait_for_pay'
          : 'pending',
      order_date: payload.form.order_date.toUTCString(),
      cartItems: payload.cartItems,
      userId: payload.id,
    })

    // this.$router.push('/account/user?idTab=2')
  },

  async cancelOrder(vuexContext, payload) {
    await this.$axios.$get(`/orders/${payload}`).then((res) => {
      if (res.orderStatus === 'pending') {
        this.$swal
          .fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios.$delete(`/orders/${payload}`).then((res) => {
                this.$axios.$get('/orders').then((res) => {
                  vuexContext.commit('setOrders', res)
                })
              })
              this.$swal.fire(
                'Completed!',
                'Your selected order has been canceled.',
                'success'
              )
            }
          })
      } else {
        this.$swal.fire(
          'Orders cannot be canceled!',
          'Because the order is no longer in the waiting state!',
          'warning'
        )
      }
    })
  },
}
