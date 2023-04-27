<template>
  <div class="p-2">
    <nuxt-link :to="`/products/${product.id}`">
      <div>
        <img :src="product.src" alt="" />
      </div>

      <div>
        <h4 class="font-bold">{{ product.title }}</h4>
        <p class="font-bold">{{ product.price }}</p>
      </div>
    </nuxt-link>
    <BaseButton :title="'Add to cart'" @click.native="addToCart(product)" />
  </div>
</template>

<script>
import BaseButton from './Button/BaseButton.vue'
export default {
  components: {
    BaseButton,
  },
  props: {
    product: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  methods: {
    addToCart(product) {
      let data = { product }
      const addedItem = this.$store.state.cart.cartItems.find(
        (i) => i.product?.id === product.id
      )
      if (addedItem) data = { ...data, quantity: addedItem.quantity + 1 }
      else data = { ...data, quantity: 1 }

      // eslint-disable-next-line no-console
      const methods = addedItem
        ? this.$axios.$put(`/cart/${addedItem.id}`, data)
        : this.$axios.$post(`/cart`, data)
      methods.then((res) => {
        this.$store.commit('cart/addToCart', res)
        this.$store.dispatch('sideMenu/setSideMenuId', 'side-menu-cart')
        if (!this.$store.state.sideMenu.isSideMenuOpen)
          this.$store.dispatch('sideMenu/setStateSideMenu')
      })
    },
  },
}
</script>

<style></style>
