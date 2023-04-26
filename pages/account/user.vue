<template>
  <div class="md:pt-[105px]">
    <div v-show="isLogin">
      <h1 class="text-3xl font-bold text-center py-10">User infor</h1>
      <hr />
      <ul class="grid md:grid-cols-2">
        <li
          v-for="(menu, index) in tabs"
          :key="menu.id"
          role="button"
          class="py-[15px] list-none text-center"
        >
          <tabs-view
            :id-tab="idTab"
            :menu="menu"
            :index="index"
            @set-id-tab="setIdTab"
          >
          </tabs-view>
        </li>
      </ul>

      <hr />
      <br />

      <component
        :is="menu.component"
        v-for="menu in tabs"
        v-show="idTab === menu.id"
        :key="menu.id"
      ></component>

      <div @click="logout">
        <base-button :title="'Logout'"></base-button>
      </div>
    </div>

    <div v-show="!isLogin">
      <login />
    </div>
  </div>
</template>

<script>
import login from './login.vue'
import TabsView from '~/components/UI/TabsView.vue'
import UserInfo from '~/components/UI/UserInfo.vue'
import UserAddress from '~/components/UI/UserAddress.vue'
import BaseButton from '~/components/UI/Button/BaseButton.vue'

export default {
  components: { TabsView, UserInfo, UserAddress, login, BaseButton },
  data() {
    return {
      idTab: 1,
      isLogin: false,
      tabs: [
        {
          id: 1,
          title: 'User info',
          component: 'user-info',
          isTabOpen: false,
        },

        {
          id: 2,
          title: 'User address',
          component: 'user-address',
          isTabOpen: false,
        },
      ],
    }
  },
  async created() {
    this.isLogin = await this.$store.state.login.isLogin
    // eslint-disable-next-line no-console
    console.log(this.isLogin, 'isLogin')
  },
  methods: {
    setIdTab(data) {
      this.idTab = data
    },
    async logout() {
      let currentUser = {}
      await this.$axios.$get('/user').then((res) => {
        currentUser = res[0]
        // eslint-disable-next-line no-console
        console.log(res, 'res')
        // eslint-disable-next-line no-console
        console.log(currentUser, 'here')
        currentUser.isLogin = false
        const updatedUser = this.$axios.$put(
          '/user',
          currentUser
        )

        currentUser = updatedUser

        this.$store.commit('login/setStateLogin', false)
        this.$router.push('/account/login')
      })
    },
  },
}
</script>

<style></style>
