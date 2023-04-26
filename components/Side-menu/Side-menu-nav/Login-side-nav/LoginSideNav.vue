<template>
  <div class="mt-7">
    <font-awesome-icon :icon="['fas', 'circle-user']" style="color: #000000" />
    <nuxt-link
      to="/account/user"
      class="uppercase"
      @click.native="closeSideMenu"
      >Login</nuxt-link
    >
  </div>
</template>

<script>
export default {
  methods: {
    closeSideMenu() {
      this.$store.dispatch('sideMenu/hideSideMenu')
    },
  },
}
</script>

<style></style>
