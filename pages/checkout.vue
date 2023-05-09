<template>
  <div class="pt-[105px]">
    <h2>Ship Information</h2>

    <div>
      <font-awesome-icon
        :icon="['fas', 'user']"
        size="lg"
        style="color: #000000"
      />
      <div>
        <p>{{ currentUser.name }}({{ currentUser.email }})</p>
        <div @click="logout">
          <base-button :title="'Logout'"></base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseButton from '~/components/UI/Button/BaseButton.vue'
export default {
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters({
      currentUser: 'login/currentUser',
    }),
  },

  created() {
    this.getCurrentUser()
    console.log(this.currentUser, 'currentUser')
  },

  methods: {
    ...mapActions({
      getCurrentUser: 'login/getCurrentUser',
      logout: 'login/logout',
    }),
  },
}
</script>

<style></style>
