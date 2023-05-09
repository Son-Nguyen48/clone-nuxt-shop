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
      console.log(res, 'res')
      vuexContext.commit('setCurrentUser', res[0])
    })
  },
  async logout() {
    if (localStorage.getItem('currentUser')) {
      const currentUser = await this.$axios.$get('/currentUser')
      const idCurrentUser = currentUser[0].id
      await this.$axios.$delete(`currentUser/${idCurrentUser}`)
      localStorage.clear('currentUser')
      this.$router.push('/account/login')
    }
  },
}
