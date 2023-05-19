<template>
  <div>
    <h3 class="text-2xl font-bold">Cart</h3>

    <br />

    <ul class="flex flex-col gap-2">
      <li v-for="(item, index) in cartItems" :key="item.id">
        <div class="flex gap-2">
          <div class="w-1/3 flex items-center">
            <img :src="item.product.image_src" alt="product" />
          </div>
          <div class="w-2/3">
            <h4 class="font-bold mt-2">{{ item.product.name }}</h4>
            <currency-formatter class="mt-2" :amount="item.product.price" />
            <div class="max-w-max mt-2" @click="removeItem(item.id)">
              <base-button :title="'Delete'"></base-button>
            </div>
            <div class="mt-2">
              <div class="mb-4">
                <button
                  :disabled="item.quantity === 0"
                  class="border shadow-md w-6"
                  @click="updateQuantity({ index, type: 'sub' })"
                >
                  -
                </button>
                <input
                  :value="item.quantity"
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
            </div>
          </div>
        </div>
      </li>

      <div class="flex gap-2">
        <div class="w-3/4" @click="closeSideMenu">
          <nuxt-link to="/">
            <base-button :title="' Shoping'"></base-button>
          </nuxt-link>
        </div>

        <div class="w-3/4" @click="updateCart(cartItems)">
          <base-button class="w-full" :title="'Update'"></base-button>
        </div>

        <div
          class="w-3/4"
          @click="
            closeSideMenu()
            updateCart(cartItems)
          "
        >
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
    }),
  },
  methods: {
    closeSideMenu() {
      if (this.$store.state.sideMenu.isSideMenuOpen) {
        console.log('here')
        this.$store.commit('sideMenu/hideSideMenu')
      }
    },
    ...mapActions({
      removeItem: 'cart/removeItem',
      updateCart: 'cart/updateCart',
      checkoutCart: 'cart/checkoutCart',
    }),

    ...mapMutations({
      updateQuantity: 'cart/updateQuantity',
    }),
  },
}
</script>

<style></style>
