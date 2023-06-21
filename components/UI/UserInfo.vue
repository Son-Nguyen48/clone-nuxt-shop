<template>
  <div>
    <div class="px-5 md:px-12 md:flex md:gap-5">
      <div class="md:border-r-2 md:pr-5 md:w-1/2">
        <h2 class="font-bold text-xl">My Profile</h2>
        <p>Manage profile information for account security</p>
        <hr />

        <form class="mt-5 flex flex-col gap-4" action="#">
          <div class="w-full md:w-auto md:flex">
            <label
              class="opacity-70 inline-block w-full md:w-1/2 lg:w-1/3"
              for=""
              >User name</label
            >
            <label class="md:w-1/2 lg:w-auto" for="">{{ user.name }}</label>
          </div>

          <div class="w-full md:w-auto md:flex md:items-center">
            <label
              class="opacity-70 inline-block w-full md:w-1/2 lg:w-1/3"
              for=""
              >Name</label
            >
            <input
              v-model="user.name"
              class="bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full md:w-1/2 lg:w-auto inline-block p-3 mt-5 md:mt-0"
              type="text"
            />
          </div>

          <div class="w-full md:w-auto md:flex md:items-center">
            <label
              class="opacity-70 inline-block w-full md:w-1/2 lg:w-1/3"
              for=""
              >Email</label
            >
            <input
              v-model="user.email"
              class="bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full md:w-1/2 lg:w-auto inline-block p-3 mt-5 md:mt-0"
              type="text"
            />
          </div>

          <div class="w-full md:w-auto md:flex md:items-center">
            <label
              class="opacity-70 inline-block w-full md:w-1/2 lg:w-1/3"
              for=""
              >Phone number</label
            >
            <input
              v-model="user.phone"
              class="bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full md:w-1/2 lg:w-auto inline-block p-3 mt-5 md:mt-0"
              type="text"
            />
          </div>

          <div class="w-full md:w-auto md:flex md:items-center">
            <label
              class="opacity-70 inline-block w-full md:w-1/2 lg:w-1/3"
              for=""
              >Avatar Profile</label
            >
            <input
              v-model="user.src"
              class="bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full md:w-1/2 lg:w-auto inline-block p-3 mt-5 md:mt-0"
              type="text"
            />
          </div>

          <div class="mt-5">
            <label
              class="opacity-70 inline-block w-full md:w-1/2 lg:w-1/3"
              for=""
              >Gender</label
            >
            <input id="man" type="radio" value="man" name="gender" checked />
            <label for="man">Man</label>
            <input id="woman" type="radio" value="woman" name="gender" />
            <label for="woman">Woman</label>
            <input id="other" type="radio" value="other" name="gender" />
            <label for="other">Other</label>
          </div>

          <div class="md:w-auto md:flex md:items-center">
            <label
              class="opacity-70 inline-block w-full md:w-1/2 lg:w-1/3"
              for=""
              >Date of birthday</label
            >
            <v-text-field
              v-model="user.dateOfBirth"
              label="Date of birth"
              placeholder="Date of birth"
              type="date"
              class="flex-grow-0 basis-2/5"
            ></v-text-field>
          </div>
        </form>
      </div>

      <div class="w-full mt-5 md:mt-0 md:w-1/2">
        <div class="md:w-full">
          <img
            class="w-[300px] h-[300px] rounded-full mx-auto"
            :src="
              user.src
                ? user.src
                : 'https://pbs.twimg.com/media/EW9Tcl0UEAAEaY3.png'
            "
            alt="avatar"
          />
        </div>

        <div class="text-center" @click="changeAvatar">
          <v-btn class="mt-5">Choose image</v-btn>
        </div>

        <p class="mt-5 text-center">
          Maximum file size 1 MB Format: .JPEG, .PNG
        </p>
      </div>
    </div>

    <div class="flex justify-evenly gap-5">
      <div class="max-w-max pt-5" @click="logout">
        <base-button :title="'Logout'"></base-button>
      </div>
      <div class="max-w-max pt-5" @click="updateUser(user)">
        <base-button :title="'Update'"></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseButton from './Button/BaseButton.vue'
export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      user: {
        name: '',
        phone: '',
        email: '',
        address: '',
        nationality: '',
        company: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        id: 0,
        src: '',
      },
      window: 0,
      items: [
        {
          id: 1,
          name: 'date',
          length: 30,
        },
        {
          id: 2,
          name: 'month',
          length: 12,
        },
        {
          id: 3,
          name: 'year',
          length: 113,
        },
      ],
    }
  },
  async created() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      await this.$axios.$get('currentUser').then((res) => {
        if (res) this.user = res.filter((item) => currentUser.id === item.id)[0]
        console.log(
          res.filter((item) => currentUser.id === item.id),
          '?USER'
        )
        // eslint-disable-next-line no-console
        console.log(
          currentUser?.id,
          'currentUser',
          this.user,
          'user',
          res,
          'res'
        )
        console.log(this.user.dateOfBirth, 'date')
      })
    }

    // this.user = JSON.parse(localStorage.getItem('currentUser'))
  },

  methods: {
    ...mapActions({
      updateUser: 'login/updateUser',
      logout: 'login/logout',
      changeAvatar: 'login/changeAvatar',
    }),
  },
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .v-input.flex-grow-0.basis-2\/5.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--is-booted.v-text-field--placeholder {
    flex-basis: 140px !important;
  }
}

@media screen and (min-width: 769px) {
  .v-input.flex-grow-0.basis-2\/5.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--is-booted.v-text-field--placeholder {
    flex-basis: 220px !important;
  }
}
</style>
