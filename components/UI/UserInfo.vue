<template>
  <div>
    <div class="px-5 md:px-12 md:flex md:gap-5">
      <div class="md:border-r-2 md:pr-5">
        <h2 class="font-bold text-xl">My Profile</h2>
        <p>Manage profile information for account security</p>
        <hr />

        <form class="mt-5 flex flex-col gap-4" action="#">
          <div class="w-full md:w-auto md:flex">
            <label class="opacity-70 inline-block w-full md:w-[300px]" for=""
              >User name</label
            >
            <label for="">{{ user.name }}</label>
          </div>

          <div class="w-full md:w-auto md:flex md:items-center">
            <label class="opacity-70 inline-block w-full md:w-[300px]" for=""
              >Name</label
            >
            <input
              v-model="user.name"
              class="bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full md:w-auto inline-block p-3 mt-5 md:mt-0"
              type="text"
            />
          </div>

          <div class="w-full md:w-auto md:flex md:items-center">
            <label class="opacity-70 inline-block w-full md:w-[300px]" for=""
              >Email</label
            >
            <input
              v-model="user.email"
              class="bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full md:w-auto inline-block p-3 mt-5 md:mt-0"
              type="text"
            />
          </div>

          <div class="w-full md:w-auto md:flex md:items-center">
            <label class="opacity-70 inline-block w-full md:w-[300px]" for=""
              >Phone number</label
            >
            <input
              v-model="user.phone"
              class="bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full md:w-auto inline-block p-3 mt-5 md:mt-0"
              type="text"
            />
          </div>

          <div class="mt-5">
            <label class="opacity-70 inline-block w-full md:w-[300px]" for=""
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
            <label class="opacity-70 inline-block w-full md:w-[300px]" for=""
              >Date of birthday</label
            >
            <div class="flex gap-5">
              <select
                v-for="item in items"
                :id="`${item.name}`"
                :key="item.id"
                class="md:w-[100px] bg-gray-200 md:py-2 md:pr-8 md:pl-3 rounded-lg w-full inline-block p-3 mt-5"
                :name="`${item.name}`"
              >
                <option value="item.name">{{ item.name }}</option>
                <option v-for="option in item.length" :key="option" value="">
                  {{
                    item.name === 'Year' ? `${1910 + Number(option)}` : option
                  }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="w-full mt-5 md:mt-0">
        <div class="md:w-full">
          <img
            class="w-[200px] h-[200px] rounded-full mx-auto"
            :src="
              user.src
                ? user.src
                : 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/309437122_207033221675116_7160048155097169836_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gqM-L9PcCHoAX87-y9e&_nc_ht=scontent.fhan5-2.fna&oh=00_AfCJ3wO3OvkWojDM7Xu2xOxH_Qc9r1N26XOEiaq2Bi7QYw&oe=6465F757'
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

    <div class="flex gap-5">
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
      user: [],
      window: 0,
      items: [
        {
          id: 1,
          name: 'Date',
          length: 30,
        },
        {
          id: 2,
          name: 'Month',
          length: 12,
        },
        {
          id: 3,
          name: 'Year',
          length: 113,
        },
      ],
    }
  },
  async created() {
    await this.$axios.$get('currentUser').then((res) => {
      if (res) this.user = res[0]
      // eslint-disable-next-line no-console
      console.log(this.user, 'user', res, 'res')
    })
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

<style></style>
