<template>
  <div class="md:pt-[105px]">
    <h1 class="pt-20 text-center font-bold text-2xl">Your cart</h1>
    <p class="text-center">
      There are {{ cartItems.length }} products in the cart
    </p>
    <hr />
    <br />

    <ul class="flex flex-col gap-2 md:mx-auto md:w-3/4">
      <li v-for="(product, index) in cartItems" :key="product.id" class="m-4">
        <div class="flex gap-2">
          <div class="w-1/3">
            <img
              class="w-20 h-20"
              :src="product.product.image_src"
              alt="product"
            />
          </div>
          <div class="w-2/3">
            <h4 class="font-bold">{{ product.product.name }}</h4>
            <currency-formatter :amount="product.product.price" />
            <div class="w-max" @click="removeItem(product.id)">
              <base-button :title="'Delete'"></base-button>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <button
            :disabled="product.quantity === 0"
            class="border shadow-md w-6"
            @click="updateQuantity({ index, type: 'sub' })"
          >
            -
          </button>
          <input
            :value="product.quantity"
            type="text"
            class="w-6 text-center"
            @change="
              (e) =>
                updateQuantity({
                  index,
                  quantity: e.target.value,
                  type: 'update',
                })
            "
          />
          <button
            class="border shadow-md w-6"
            @click="updateQuantity({ index, type: 'add' })"
          >
            +
          </button>
        </div>
        <hr />
      </li>
      <!-- <p class="px-9 md:px-2">Tổng Tiền: {{ totalPrice }}đ</p> -->
      <span class="mx-4">Total: </span>
      <currency-formatter class="mx-4" :amount="`${String(totalPrice)}`" />

      <div class="flex flex-col gap-2 items-center mb-4 md:flex-row md:mx-2">
        <div class="w-3/4">
          <nuxt-link to="/">
            <base-button
              class="w-full"
              :title="'Continue shopping'"
            ></base-button>
          </nuxt-link>
        </div>
        <div class="w-3/4" @click="updateCart({ cartItems, deleteId })">
          <base-button class="w-full" :title="'Update'"></base-button>
        </div>

        <div class="w-3/4" @click="checkoutCart({ cartItems, deleteId })">
          <base-button class="w-full" :title="'Pay'"></base-button>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BaseButton from '~/components/UI/Button/BaseButton.vue'
import CurrencyFormatter from '~/components/UI/CurrencyFormatter.vue'
export default {
  components: {
    BaseButton,
    CurrencyFormatter,
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/cartItems',
      totalPrice: 'cart/totalPrice',
      deleteId: 'cart/deleteId',
    }),
  },
  async created() {
    const userId = JSON.parse(localStorage.getItem('currentUser'))?.id
    if (userId) await this.$store.dispatch('cart/getListItem', userId)
  },
  methods: {
    ...mapActions({
      removeItem: 'cart/removeItem',
      updateCart: 'cart/updateCart',
      checkoutCart: 'cart/checkoutCart',
      updateQuantity: 'cart/updateQuantity',
    }),

    ...mapMutations({}),
  },
}
</script>

<style scoped></style>
