<template>
  <div class="pt-[145px] mx-auto">
    <h1 class="mt-5 font-bold text-2xl">Sign Up</h1>
    <form class="mt-5" @submit.prevent="signUp">
      <div>
        <label class="w-[100px] inline-block" for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          class="bg-gray-300 w-auto p-3 rounded"
          type="email"
        />
      </div>

      <br />
      <hr />
      <div class="mt-5">
        <label class="w-[100px] inline-block" for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          class="bg-gray-300 w-auto p-3 rounded"
          type="password"
        />
      </div>
      <br />
      <div class="flex gap-5">
        <nuxt-link to="/Auth-FireBase/Login">
          <v-btn class="mt-5">Sign in</v-btn>
        </nuxt-link>
        <v-btn class="mt-5" type="submit">Sign Up</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async signUp() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password)
        this.$router.push('/Auth-FireBase/Login')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
