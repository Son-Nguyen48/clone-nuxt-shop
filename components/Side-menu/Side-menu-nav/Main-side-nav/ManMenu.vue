<template>
  <side-menu-link :title="'Man Menu'" :component="component"></side-menu-link>
</template>

<script>
import SideMenuLink from '~/components/UI/Button/SideMenuLink.vue'
export default {
  components: {
    SideMenuLink,
  },
  props: {
    component: {
      type: String,
      require: true,
      default: () => {},
    },
  },
}
</script>

<style></style>
