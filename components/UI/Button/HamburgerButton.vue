<template>
  <span
    role="button"
    class="hamburger-menu inline-block relative bg-[#252a2b] w-[27px] h-[3px] transform translate-y-5 mx-[5px]"
    @click="toggleSideMenu"
  ></span>
</template>

<script>
export default {
  data() {
    return {
      isSideMenuOpen: false,
    }
  },
  methods: {
    toggleSideMenu() {
      this.$store.dispatch('sideMenu/setSideMenuId', 'side-menu-nav')
      this.$store.dispatch('sideMenu/setStateSideMenu')
      // eslint-disable-next-line no-console
      console.log(this.$store.state.sideMenu.isSideMenuOpen, 'here')
    },
  },
}
</script>

<style></style>
