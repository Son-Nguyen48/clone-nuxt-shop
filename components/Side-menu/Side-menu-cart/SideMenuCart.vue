<template>
  <div>
    <h3 class="text-2xl font-bold">Cart</h3>

    <br />

    <ul class="flex flex-col gap-2">
      <li v-for="product in cart" :key="product.id">
        <div class="flex gap-2">
          <div class="w-1/3">
            <img :src="product.src" alt="product" />
          </div>
          <div class="w-2/3">
            <h4 class="font-bold">{{ product.title }}</h4>
            <p>{{ product.price }}</p>
            <div @click="removeItem(product.id)">
              <base-button :title="'Delete'"></base-button>
            </div>
          </div>
        </div>
      </li>
      <p class="px-9 md:px-2">Tổng Tiền: {{ totalPrice }}đ</p>
      <div class="flex flex-col gap-2 items-center mb-4 md:flex-row md:mx-2">
        <div class="w-3/4">
          <nuxt-link to="/">
            <base-button
              class="w-full"
              :title="'Continue shopping'"
              @click.native="closeSideMenu"
            ></base-button>
          </nuxt-link>
        </div>
        <div class="w-3/4">
          <nuxt-link to="/cart" @click.native="closeSideMenu">
            <base-button class="w-full" :title="'Go to Cart'"></base-button>
          </nuxt-link>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
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
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + +item.price, 0)
    },
  },
  async created() {
    await this.$store.dispatch('cart/getListProduct').then((res) => {
      this.cart = this.$store.state.cart.listProduct
    })
  },
  methods: {
    async removeItem(id) {
      await this.$store.commit('cart/deleteCartItem', id)
    },
    closeSideMenu() {
      this.$store.dispatch('sideMenu/hideSideMenu', false)
      // eslint-disable-next-line no-console
      console.log(this.$store.state.sideMenu.isSideMenuOpen, 'log here')
    },
  },
}
</script>

<style></style>
