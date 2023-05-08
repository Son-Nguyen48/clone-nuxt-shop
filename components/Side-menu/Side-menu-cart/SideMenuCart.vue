<template>
  <div>
    <h3 class="text-2xl font-bold">Cart</h3>

    <br />

    <ul class="flex flex-col gap-2">
      <li v-for="item in cartItems" :key="item.id">
        <div class="flex gap-2">
          <div class="w-1/3">
            <img :src="item.product.image_src" alt="product" />
          </div>
          <div class="w-2/3">
            <h4 class="font-bold">{{ item.product.name }}</h4>
            <p>{{ item.product.price }}</p>
            <div @click="removeItem(item.id)">
              <base-button :title="'Delete'"></base-button>
            </div>
            <div>
              <p>{{ item.quantity }}</p>
            </div>
          </div>
        </div>
      </li>

      <div class="flex gap-2">
        <div>
          <nuxt-link to="/">
            <base-button :title="'Continue shoping'"></base-button>
          </nuxt-link>
        </div>
        <div @click="closeSideMenu">
          <nuxt-link to="/cart">
            <base-button :title="'Pay'"></base-button>
          </nuxt-link>
        </div>
      </div>
    </ul>

    <div class="py-2">
      <p>Total: {{ totalPrice }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseButton from '~/components/UI/Button/BaseButton.vue'
export default {
  components: {
    BaseButton,
  },

  computed: {
    ...mapGetters({
      cartItems: 'cart/cartItems',
      totalPrice: 'cart/totalPrice',
    }),
  },
  methods: {
    closeSideMenu() {
      if (this.$store.state.sideMenu.isSideMenuOpen) {
        this.$store.commit('sideMenu/hideSideMenu')
      }
    },
    ...mapActions({
      removeItem: 'cart/removeItem',
    }),
  },
}
</script>

<style></style>
