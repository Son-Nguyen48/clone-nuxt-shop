<template>
  <div class="pt-[145px] mx-auto">
    <h1 class="font-bold p-3">Đăng ký tài khoản</h1>
    <form @submit.prevent="register">
      <div class="mb-2 flex gap-5">
        <label class="w-[200px]" for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="bg-gray-300 p-3 rounded"
          required
        />
      </div>
      <div class="mb-2 flex gap-5">
        <label class="w-[200px]" for="password">Mật khẩu:</label>
        <input
          id="email"
          v-model="password"
          type="password"
          class="bg-gray-300 p-3 rounded"
          required
        />
      </div>
      <button class="w-[200px]" type="submit">Đăng ký</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('Đăng ký thành công.')
          this.$router.push('/account/user')
        })
        .catch((error) => {
          alert(error.message)
        })
    },
  },
}
</script>
