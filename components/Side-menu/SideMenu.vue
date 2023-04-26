<template>
  <div
    v-show="isSideMenuOpen"
    class="fixed overflow-y-scroll right-0 top-0 w-full md:w-80 h-full z-[1000] bg-white px-[30px] pt-10"
  >
    <component :is="sideMenuId"></component>
    <close-button></close-button>
  </div>
</template>

<script>
import CloseButton from '../UI/Button/CloseButton.vue'
import SideMenuNav from './Side-menu-nav/SideMenuNav.vue'
import SideMenuCart from './Side-menu-cart/SideMenuCart.vue'

export default {
  components: {
    SideMenuNav,
    CloseButton,
    SideMenuCart,
  },

  data() {
    return {
      menu: 'side-menu-nav',
    }
  },

  computed: {
    isSideMenuOpen() {
      return this.$store.state.sideMenu.isSideMenuOpen
    },
    sideMenuId() {
      return this.$store.state.sideMenu.sideMenuId
    },
  },

  // watch: {
  //   $route() {
  //     this.$store.dispatch('sideMenu/hideSideMenu', false)
  //   },
  // },
}
</script>

<style></style>
