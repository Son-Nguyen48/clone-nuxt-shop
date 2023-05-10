<template>
  <div class="md:pt-[105px] px-2 md:px-10">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <font-awesome-icon
            :icon="['fas', 'cart-shopping']"
            style="color: #005eff"
          />
          Show order information
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ul class="flex flex-col gap-2 mx-4 md:mx-auto md:w-3/4">
            <li
              v-for="(product, index) in cartItems"
              :key="product.id"
              class="my-4"
            >
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
                  <p>{{ product.product.price }}đ</p>
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
            <p class="px-9 md:px-2">Tổng Tiền: {{ totalPrice }}đ</p>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <h2>Ship Information</h2>

    <div>
      <font-awesome-icon
        :icon="['fas', 'user']"
        size="lg"
        style="color: #000000"
      />
      <div>
        <p>{{ currentUser.name }}({{ currentUser.email }})</p>
        <div @click="logout">
          <base-button :title="'Logout'"></base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BaseButton from '~/components/UI/Button/BaseButton.vue'
export default {
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters({
      currentUser: 'login/currentUser',
      cartItems: 'cart/cartItems',
      totalPrice: 'cart/totalPrice',
    }),
  },

  async created() {
    await this.getCurrentUser()
    await this.$store.dispatch('cart/getListItem')
  },

  methods: {
    ...mapActions({
      getCurrentUser: 'login/getCurrentUser',
      logout: 'login/logout',
      removeItem: 'cart/removeItem',
    }),
    ...mapMutations({
      updateQuantity: 'cart/updateQuantity',
    }),
  },
}
</script>

<style></style>
