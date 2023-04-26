<template>
  <div class="absolute right-[30px] top-10" @click="closeSideMenu">
    <font-awesome-icon
      :icon="['fas', 'xmark']"
      size="lg"
      style="color: #000000"
    />
  </div>
</template>

<script>
export default {
  methods: {
    closeSideMenu() {
      this.$store.dispatch('sideMenu/setStateSideMenu')
      // eslint-disable-next-line no-console
      console.log(this.$store.state.sideMenu.isSideMenuOpen, 'here')
    },
  },
}
</script>

<style></style>
