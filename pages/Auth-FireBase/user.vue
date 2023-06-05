<template>
  <div class="pt-[145px]">
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  methods: {
    async signOut() {
      try {
        await auth.signOut()
        this.$router.push('/Auth-FireBase/Login')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
