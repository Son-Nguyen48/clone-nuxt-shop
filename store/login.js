import { auth } from '~/plugins/firebase'

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
    // eslint-disable-next-line no-console
    console.log(payload.id, 'payload')
    await this.$axios.$get(`/accounts/${payload.id}`).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res, 'res')
      vuexContext.commit('setCurrentUser', res)
    })
  },
  async logout() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    // if (currentUser) {
    //   await this.$swal
    //     .fire({
    //       title: 'Are you sure?',
    //       text: 'Do you really want to logout?',
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes, let me out!',
    //     })
    //     .then((result) => {
    //       if (result.isConfirmed) {
    //         this.$swal.fire(
    //           'Logout!',
    //           'You are redirected to the login page!',
    //           'success'
    //         )
    //         const idCurrentUser = currentUser.id
    //         console.log(currentUser, 'currentUser', currentUser.id, 'currentId')
    //         this.$axios.$delete(`currentUser/${idCurrentUser}`)
    //         localStorage.clear('currentUser')
    //         this.$router.push('/account/login')
    //       }
    //     })
    // }

    try {
      await auth.signOut()
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
            this.$router.push('/account/login')
          }
        })
    } catch (error) {
      console.error(error)
    }
  },

  async updateUser(vuexContext, payload) {
    // await this.$axios.$put(`/currentUser/${payload.id}`, payload)
    await this.$axios.$put(`/accounts/${payload.id}`, payload)
    localStorage.clear('currentUser')
    await this.$axios.$get(`/accounts/${payload.id}`).then((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res))
    })

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
    console.log(payload, 'payload', accounts, 'accounts')

    const isValidUser = accounts.filter((item) => {
      return item.email === payload.email
    })

    // await this.$axios.$get('/currentUser').then((res) => {
    //   const isLogined = res.filter((item) => {
    //     return item.id === isValidUser[0].id
    //   }).length

    //   // eslint-disable-next-line no-console
    //   console.log(isLogined, 'isLogined')

    //   // eslint-disable-next-line no-console
    //   console.log(isValidUser, 'isValidUser')

    //   if (isLogined === 0) {
    //     // eslint-disable-next-line no-console
    //     console.log(accounts, 'accounts', payload, 'account')

    //     // eslint-disable-next-line no-console
    //     console.log(isValidUser, 'isValidUser')

    //     if (payload.password === isValidUser[0].password) {
    //       this.$swal.fire(
    //         'Logged in successfully!',
    //         'You are redirected to the Profile page!',
    //         'success'
    //       )
    //       this.$axios.$post('/currentUser', isValidUser[0]).then((res) => {
    //         localStorage.setItem('currentUser', JSON.stringify(isValidUser[0]))
    //         this.$router.push('/account/user')
    //       })
    //     } else {
    //       this.$swal.fire(
    //         'Your email or password is incorrect!',
    //         'Please enter your email and password again!',
    //         'error'
    //       )
    //     }
    //   } else {
    //     this.$swal.fire(
    //       'Logged in successfully!',
    //       'You are redirected to the Profile page!',
    //       'success'
    //     )

    //     // eslint-disable-next-line no-console
    //     console.log(isValidUser, 'isValidUser')

    //     localStorage.setItem('currentUser', JSON.stringify(isValidUser[0]))
    //     this.$router.push('/account/user')
    //   }
    // })

    try {
      await auth.signInWithEmailAndPassword(payload.email, payload.password)
      this.$swal.fire(
        'Logged in successfully!',
        'You are redirected to the Profile page!',
        'success'
      )
      localStorage.setItem('currentUser', JSON.stringify(isValidUser[0]))
      this.$router.push('/account/user')
    } catch (error) {
      this.$swal.fire(
        'Your email or password is incorrect!',
        'Please enter your email and password again!',
        'error'
      )
      console.error(error)
    }
  },

  onFileSelected(vuexContext, payload, event) {
    console.log(event, 'event')
  },
}
