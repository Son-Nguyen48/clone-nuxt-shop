<template>
  <div class="md:pt-[105px] md:flex">
    <h1
      class="text-3xl font-bold py-10 text-center w-1/2 md:flex items-center justify-center mx-auto md:m-0 md:border-r md:border-gray-300"
    >
      Create Account
    </h1>

    <hr class="hidden md:block" />

    <form
      action="#"
      class="px-2 mt-10 flex flex-col gap-2 w-full md:w-1/2 md:text-center"
      @submit.prevent="signup"
    >
      <div>
        <input
          v-model="lastName"
          class="py-2 px-3 w-full md:w-3/4 bg-gray-200 rounded"
          type="text"
          placeholder="Last name"
        />
      </div>

      <div>
        <input
          v-model="firstName"
          class="py-2 px-3 w-full md:w-3/4 bg-gray-200 rounded"
          type="text"
          placeholder="First Name"
        />
      </div>

      <div>
        <input
          id="Woman"
          v-model="gender"
          type="radio"
          name="gender"
          value="Woman"
        />
        <label for="Woman">Woman</label>
        <input
          id="Man"
          v-model="gender"
          type="radio"
          name="gender"
          value="Man"
        />
        <label for="Man">Man</label>
      </div>

      <div>
        <input
          id="date"
          v-model="dateOfBirth"
          class="py-2 px-3 w-full md:w-3/4 bg-gray-200 rounded"
          type="date"
          name="date"
        />
      </div>

      <div>
        <input
          v-model="email"
          class="py-2 px-3 w-full md:w-3/4 bg-gray-200 rounded"
          type="email"
          placeholder="Email"
        />
      </div>

      <div>
        <input
          v-model="phoneNumber"
          class="py-2 px-3 w-full md:w-3/4 bg-gray-200 rounded"
          type="text"
          placeholder="Phone number"
        />
      </div>

      <div>
        <input
          id="password"
          v-model="password"
          class="py-2 px-3 w-full md:w-3/4 bg-gray-200 rounded"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div>
        <BaseButton :title="'Register'" class="w-full md:w-3/4" />
      </div>

      <div>
        <nuxt-link to="/account/login" class="w-full">
          <BaseButton :title="'Back to Login'" class="w-full md:w-3/4" />
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from '~/components/UI/Button/BaseButton.vue'
import { auth } from '~/plugins/firebase'

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      lastName: '',
      firstName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      phoneNumber: '',
      password: '',
    }
  },

  computed: {
    date() {
      return new Date(this.dateOfBirth).getDate()
    },
    month() {
      return new Date(this.dateOfBirth).getMonth()
    },
    year() {
      return new Date(this.dateOfBirth).getFullYear()
    },
  },

  methods: {
    async createUser(newUser) {
      await this.$axios
        .$post('/accounts', newUser)
        .then((res) => {
          this.$swal.fire(
            'Successful account registration!',
            'Thank you for using the service!',
            'success'
          )
          auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
          this.$router.push('/account/Login')
        })
        .catch((e) => {
          console.log(e)
        })
    },

    handleSignup() {
      const newUser = {
        name: this.lastName + this.firstName,
        phone: this.phoneNumber,
        email: this.email,
        address: 'Vietnam',
        nationality: 'Vietnam',
        company: 'VMO',
        password: this.password,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
      }
      this.createUser(newUser)
    },

    signup() {
      this.handleSignup()
    },
  },
}
</script>

<style></style>
