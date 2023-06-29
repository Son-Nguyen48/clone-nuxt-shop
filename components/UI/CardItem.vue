<template>
  <div
    class="p-2 flex flex-col justify-between transition-all ease-linear duration-300 hover:transform hover:scale-105 hover:-translate-y-2 rounded-lg"
  >
    <nuxt-link :to="`/products/${product.id}`">
      <div>
        <img class="rounded-lg" :src="product.image_src" alt="" />
      </div>

      <div class="flex flex-col justify-between">
        <h4 class="font-bold">{{ product.name }}</h4>
        <currency-formatter :amount="product.price" />
      </div>
    </nuxt-link>
    <BaseButton :title="'Add to cart'" @click.native="addToCart(product)" />
  </div>
</template>

<script>
import BaseButton from './Button/BaseButton.vue'
import CurrencyFormatter from './CurrencyFormatter.vue'
export default {
  components: {
    BaseButton,
    CurrencyFormatter,
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
      // await this.$swal
      //   .fire({
      //     title: 'Are you sure?',
      //     text: 'Do you want to add this item to cart?',
      //     icon: 'question',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes, Add it!',
      //   })
      //   .then((result) => {
      //     if (result.isConfirmed) {
      let data = { product }
      const addedItem = await this.$store.state.cart.cartItems.find(
        (i) => i.product?.id === product.id
      )
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (addedItem && addedItem.quantity > 1)
        data = {
          ...data,
          userId: currentUser.id,
          quantity: addedItem.quantity + 1,
        }
      else data = { ...data, userId: currentUser.id, quantity: 1 }
      const currentProduct = await this.$axios.$get(`/products/${product.id}`)
      const currentQuantity = currentProduct.quantity
      if (currentQuantity >= 1) {
        const methods = addedItem
          ? this.$axios.$put(`/cart/${addedItem.id}`, data)
          : this.$axios.$post(`/cart`, data)
        console.log(currentQuantity, 'currentQuantity')
        methods.then((res) => {
          console.log(res, 'res')
          this.$axios.$patch(`/products/${data.product.id}`, {
            quantity: currentQuantity - 1,
          })
          this.$store.commit('cart/addToCart', res)
          // this.$store.dispatch('sideMenu/setSideMenuId', 'side-menu-cart')
          // if (!this.$store.state.sideMenu.isSideMenuOpen)
          //   this.$store.dispatch('sideMenu/setStateSideMenu')
          this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your product has been added to cart!',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          })
        })
      } else {
        this.$swal.fire({
          position: 'top-end',
          icon: 'error',
          title:
            'You can not add this item to the cart because this product quantity is 0!',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        })
      }
      //       this.$swal.fire('Great!', 'Your item has been added.', 'success')
      //     }
      //   })
    },
  },
}
</script>

<style></style>
