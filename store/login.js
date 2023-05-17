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
    await this.$axios.$get('/currentUser').then((res) => {
      vuexContext.commit('setCurrentUser', res[0])
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
}
