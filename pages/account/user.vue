<template>
  <div class="md:pt-[105px]">
    <div class="md:px-12">
      <h1 class="text-3xl font-bold text-center py-10">User infor</h1>
      <hr />
      <ul class="grid md:grid-cols-3">
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
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import login from './login.vue'
import TabsView from '~/components/UI/TabsView.vue'
import UserInfo from '~/components/UI/UserInfo.vue'
import BaseButton from '~/components/UI/Button/BaseButton.vue'

export default {
  components: {
    TabsView,
    UserInfo,
    login,
    BaseButton,
  },
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
      ],
    }
  },
  created() {
    if (localStorage.getItem('currentUser')) this.isLogin = true
    if (this.isLogin === false) {
      this.$router.push('/account/login')
    }
  },
  methods: {
    setIdTab(data) {
      this.idTab = data
    },
    ...mapActions({
      logout: 'login/logout',
    }),
  },
}
</script>

<style></style>
