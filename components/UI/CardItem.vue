<template>
  <div class="p-2">
    <nuxt-link :to="`/products/${product.id}`">
      <div>
        <img :src="product.image_src" alt="" />
      </div>

      <div>
        <h4 class="font-bold">{{ product.name }}</h4>
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
    async addToCart(product) {
      await this.$swal
        .fire({
          title: 'Are you sure?',
          text: 'Do you want to add this item to cart?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Add it!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            let data = { product }
            const addedItem = this.$store.state.cart.cartItems.find(
              (i) => i.product?.id === product.id
            )
            if (addedItem) data = { ...data, quantity: addedItem.quantity + 1 }
            else data = { ...data, quantity: 1 }

            const methods = addedItem
              ? this.$axios.$put(`/cart/${addedItem.id}`, data)
              : this.$axios.$post(`/cart`, data)

            methods.then((res) => {
              this.$store.commit('cart/addToCart', res)
              this.$store.dispatch('sideMenu/setSideMenuId', 'side-menu-cart')
              if (!this.$store.state.sideMenu.isSideMenuOpen)
                this.$store.dispatch('sideMenu/setStateSideMenu')
            })
            this.$swal.fire('Great!', 'Your item has been added.', 'success')
          }
        })
    },
  },
}
</script>

<style></style>
