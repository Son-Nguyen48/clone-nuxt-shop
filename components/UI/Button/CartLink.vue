<template>
  <span class="relative mx-[5px]">
    <div class="inline-block remove-hightlight" @click="openCart">
      <span>
        <svg
          version="1.1"
          class="svg-cart w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 24 27"
          style="enable-background: new 0 0 24 27"
          xml:space="preserve"
        >
          <g><path d="M0,6v21h24V6H0z M22,25H2V8h20V25z"></path></g>
          <g>
            <path
              d="M12,2c3,0,3,2.3,3,4h2c0-2.8-1-6-5-6S7,3.2,7,6h2C9,4.3,9,2,12,2z"
            ></path>
          </g>
        </svg>
      </span>
      <span
        class="inline-block absolute -top-[5.6px] left-1/2 transform -translate-x-1/2"
        >{{ cartCount }}</span
      >
    </div>
  </span>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    }
  },
  computed: {
    cartCount() {
      return this.cart.length
    },
  },
  async created() {
    await this.$store.dispatch('cart/getListProduct')
    this.cart = this.$store.state.cart.listProduct
  },
  methods: {
    openCart() {
      this.$store.dispatch('sideMenu/setSideMenuId', 'side-menu-cart')
      this.$store.dispatch('sideMenu/setStateSideMenu')
    },
  },
}
</script>

<style scoped>
.remove-hightlight {
  -webkit-tap-highlight-color: transparent;
}
</style>
