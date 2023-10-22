<template>
  <div role="button" class="relative mx-[5px] flex items-center">
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
        class="inline-block absolute top-1/2 left-1/2 transform -translate-y-1/3 -translate-x-1/2"
        >{{ itemsQuantity }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      cart: [],
    }
  },
  computed: {
    ...mapGetters({
      itemsQuantity: 'cart/itemsQuantity',
      cartItems: 'cart/cartItems',
    }),
  },
  async created() {
    const userId = JSON.parse(localStorage.getItem('currentUser'))?.id
    console.log(userId, 'userId')
    if (userId) {
      await this.$store.dispatch('cart/getListItem', userId)
      console.log('cartItems: ', this.cartItems)
    }
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
