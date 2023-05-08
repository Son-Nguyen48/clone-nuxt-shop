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
              class="inline-block bg-[#FFDD00] py-2 px-3 font-bold rounded w-full"
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

      if (this.password === isValidUser[0].password) {
        this.$axios.$post('/currentUser', isValidUser[0]).then((res) => {
          localStorage.setItem('currentUser', JSON.stringify(isValidUser[0]))
          this.$router.push('/account/user')
        })
      }
    },
  },
}
</script>

<style></style>
