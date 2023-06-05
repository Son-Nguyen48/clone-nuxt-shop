<template>
  <div class="pt-[145px] mx-auto">
    <h1 class="mt-5 font-bold text-2xl">Sign In</h1>
    <form class="mt-5" @submit.prevent="signIn">
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
        <v-btn class="mt-5" type="submit">Sign In</v-btn>
        <nuxt-link to="/Auth-FireBase/sign-up">
          <v-btn class="mt-5">Sign up</v-btn>
        </nuxt-link>
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
    async signIn() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password)
        this.$router.push('/Auth-FireBase/user')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
