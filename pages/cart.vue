<template>
  <div class="md:pt-[105px]">
    <h1 class="pt-20 text-center font-bold text-2xl">Your cart</h1>
    <p class="text-center">There are {{ cart.length }} products in the cart</p>
    <hr />
    <br />

    <ul class="flex flex-col gap-2 mx-4 md:mx-auto md:w-3/4">
      <li v-for="product in cartItems" :key="product.id" class="my-4">
        <div class="flex gap-2">
          <div class="w-1/3">
            <img class="w-20 h-20" :src="product.product.src" alt="product" />
          </div>
          <div class="w-2/3">
            <h4 class="font-bold">{{ product.product.title }}</h4>
            <p>{{ product.product.price }}đ</p>
            <div @click="removeItem(product.product.id)">
              <base-button :title="'Delete'"></base-button>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <button class="border shadow-md w-6">-</button>
          <input type="text" placeholder="1" class="w-6 text-center" />
          <button class="border shadow-md w-6">+</button>
        </div>
        <hr />
      </li>
      <p class="px-9 md:px-2">Tổng Tiền: {{ totalPrice }}đ</p>
      <div class="flex flex-col gap-2 items-center mb-4 md:flex-row md:mx-2">
        <div class="w-3/4">
          <nuxt-link to="/">
            <base-button
              class="w-full"
              :title="'Continue shopping'"
            ></base-button>
          </nuxt-link>
        </div>
        <base-button class="w-3/4" :title="'Update'"></base-button>
        <base-button class="w-3/4" :title="'Pay'"></base-button>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseButton from '~/components/UI/Button/BaseButton.vue'
export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      cart: [],
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/cartItems',
      totalPrice: 'cart/totalPrice',
    }),
  },
  async created() {
    await this.$store.dispatch('cart/getListItem')
  },
}
</script>

<style></style>
