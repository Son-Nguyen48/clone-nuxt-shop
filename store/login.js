export const state = () => ({
  currentUser: {},
})

export const getters = {
  currentUser: (s) => s.currentUser,
}

export const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = payload
  },
}

export const actions = {
  async getCurrentUser(vuexContext, payload) {
    console.log(payload.id, 'payload')
    await this.$axios.$get(`/currentUser/${payload.id}`).then((res) => {
      console.log(res, 'res')
      vuexContext.commit('setCurrentUser', res)
    })
  },
  async logout() {
    if (localStorage.getItem('currentUser')) {
      await this.$swal
        .fire({
          title: 'Are you sure?',
          text: 'Do you really want to logout?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, let me out!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Logout!',
              'You are redirected to the login page!',
              'success'
            )
          }
        })
      const currentUser = await this.$axios.$get('/currentUser')
      const idCurrentUser = currentUser[0].id
      await this.$axios.$delete(`currentUser/${idCurrentUser}`)
      localStorage.clear('currentUser')
      this.$router.push('/account/login')
    }
  },

  async updateUser(vuexContext, payload) {
    await this.$axios.$put(`/currentUser/${payload.id}`, payload)
    await this.$axios.$put(`/accounts/${payload.id}`, payload)

    await this.$swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your user profile has been updated',
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    })
  },

  async login(vuexContext, payload) {
    let accounts = []
    await this.$axios.$get('/accounts').then((res) => {
      // eslint-disable-next-line no-console
      accounts = res
    })

    // eslint-disable-next-line no-console
    console.log(accounts, 'accounts', payload, 'account')

    const isValidUser = accounts.filter((item) => {
      return item.email === payload.email
    })

    // eslint-disable-next-line no-console
    console.log(isValidUser, 'isValidUser')

    if (payload.password === isValidUser[0].password) {
      await this.$swal.fire(
        'Logged in successfully!',
        'You are redirected to the Profile page!',
        'success'
      )
      this.$axios.$post('/currentUser', isValidUser[0]).then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(isValidUser[0]))
        this.$router.push('/account/user')
      })
    } else {
      await this.$swal.fire(
        'Your email or password is incorrect!',
        'Please enter your email and password again!',
        'error'
      )
    }
  },
}
