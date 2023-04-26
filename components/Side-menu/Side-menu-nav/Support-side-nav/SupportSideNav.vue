<template>
  <div class="mt-7">
    <ul>
      <li>
        <nuxt-link
          class="uppercase"
          to="/views/introduce"
          @click.native="closeSideMenu"
          >Introduce</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          class="uppercase"
          to="/views/contact"
          @click.native="closeSideMenu"
          >Contact</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          class="uppercase"
          to="/views/shop-system"
          @click.native="closeSideMenu"
          >Shop system</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          class="uppercase"
          to="/views/size-guide"
          @click.native="closeSideMenu"
          >Size guide</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    closeSideMenu() {
      this.$store.dispatch('sideMenu/hideSideMenu')
    },
  },
}
</script>

<style></style>
