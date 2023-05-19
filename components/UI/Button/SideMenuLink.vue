<template>
  <nuxt-link :to="'/' + component" @click.native="closeSideMenu">{{
    title
  }}</nuxt-link>
</template>

<script>
export default {
  props: {
    component: {
      type: String,
      require: true,
      default: () => {},
    },
    title: {
      type: String,
      require: true,
      default: () => {},
    },
  },
  methods: {
    closeSideMenu() {
      this.$store.dispatch('sideMenu/hideSideMenu', false)
      // eslint-disable-next-line no-console
      console.log(this.$store.state.sideMenu.isSideMenuOpen, 'log here')
    },
  },
}
</script>

<style></style>
