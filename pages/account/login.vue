<template>
  <div class="md:pt-[185px] md:pb-20">
    <div v-show="!isForgotPassword" class="md:flex">
      <h1
        class="text-3xl font-bold py-10 text-center md:w-1/2 md:border-r md:border-gray-400"
      >
        Login
      </h1>
      <hr />
      <form action="#" class="md:w-1/2" @submit.prevent="login">
        <div class="p-2 md:w-3/4 md:mx-auto">
          <input
            v-model="email"
            placeholder="Email"
            class="w-full p-2 bg-gray-200"
            type="email"
          />
        </div>
        <div class="p-2 md:w-3/4 mx-auto">
          <input
            v-model="password"
            placeholder="Password"
            class="w-full p-2 bg-gray-200"
            type="password"
          />
        </div>

        <div class="md:flex md:gap-4 justify-center mt-5 px-2">
          <div class="text-center my-4 md:mt-0">
            <base-button :title="'Login'" class="w-full"></base-button>
          </div>

          <div class="text-center my-4 md:mt-0">
            <nuxt-link to="/account/resetPassword">
              <base-button
                :title="'Forgot password?'"
                class="w-full"
              ></base-button>
            </nuxt-link>
          </div>

          <div class="text-center my-4 md:mt-0">
            <nuxt-link to="/account/signup">
              <base-button :title="'Sign up'" class="w-full"></base-button>
            </nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/UI/Button/BaseButton.vue'
export default {
  components: { BaseButton },
  data() {
    return {
      email: '',
      password: '',
      isForgotPassword: false,
    }
  },
  methods: {
    async login() {
      let accounts = []
      await this.$axios.$get('/accounts').then((res) => {
        // eslint-disable-next-line no-console
        accounts = res
      })

      // eslint-disable-next-line no-console
      console.log(accounts, 'accounts')

      const isValidUser = accounts.filter((item) => {
        return item.email === this.email
      })

      // eslint-disable-next-line no-console
      console.log(isValidUser, 'isValidUser')

      if (this.password === isValidUser[0].password) {
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
  },
}
</script>

<style></style>
