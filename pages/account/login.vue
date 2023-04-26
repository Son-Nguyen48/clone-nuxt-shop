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
          <div class="text-center">
            <base-button :title="'Login'" class="w-full"></base-button>
          </div>

          <div
            class="mt-4 md:mt-0 text-center"
            @click="isForgotPassword = true"
          >
            <base-button
              :title="'Forgot password?'"
              class="w-full"
            ></base-button>
          </div>

          <div class="mt-4 md:mt-0 text-center">
            <nuxt-link
              to="/account/signup"
              class="inline-block bg-[#FFDD00] py-2 px-3 text-white font-bold rounded w-full"
              >Sign up</nuxt-link
            >
          </div>
        </div>
      </form>
    </div>

    <div v-show="isForgotPassword" class="px-2 md:flex">
      <h2
        class="text-3xl font-bold py-10 text-center md:w-1/2 md:border-r md:border-gray-400"
      >
        Password Recovery
      </h2>
      <div class="px-2 w-1/2 text-center">
        <input
          class="py-2 px-3 bg-gray-200 w-3/4 my-5 md:mt-2 rounded"
          type="email"
          placeholder="Email"
        />
        <div class="flex justify-center">
          <base-button :title="'Send'" class="mr-2"></base-button>
          <div @click="isForgotPassword = false">
            <base-button :title="'Cancel'"></base-button>
          </div>
        </div>
      </div>
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
    login() {
      // eslint-disable-next-line no-console
      this.handleLogin()
    },
    async checkLogin(user) {
      await this.$axios
        .$get('/users')
        .then((res) => {
          const account = res.filter((res) => {
            return res.email === user.email
          })

          const accountPassword = account[0].password
          const userPassword = user.password

          const isValidUser = accountPassword === userPassword

          // eslint-disable-next-line no-console
          console.log('here')

          if (isValidUser) {
            account[0].isLogin = true
            this.saveLogin(account)
            this.$store.commit('login/setStateLogin', true)
            // eslint-disable-next-line no-console
            console.log(this.$store.state.login.isLogin, 'isLogin')
            this.$router.push('/account/user')
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },

    handleLogin() {
      const user = {
        email: this.email,
        password: this.password,
      }

      // eslint-disable-next-line no-console
      console.log('here')

      this.checkLogin(user)
    },

    async saveLogin(account) {
      const user = await this.$axios.$get('/user')
      const currentUser = user.data

      // eslint-disable-next-line no-console
      console.log('here')

      this.updateCurrentUser(account, currentUser)
    },

    async updateCurrentUser(account, currentUser) {
      const updatedUser = await this.$axios.$put(
        '/user',
        account
      )

      // eslint-disable-next-line no-console
      console.log('here')

      currentUser = updatedUser
    },
  },
}
</script>

<style></style>
