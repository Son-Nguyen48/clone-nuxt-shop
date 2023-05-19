<template>
  <div class="md:pt-[105px] px-2 md:px-10 md:flex">
    <v-expansion-panels class="mb-8 md:mb-0">
      <v-expansion-panel>
        <v-expansion-panel-header>
          Show order information
        </v-expansion-panel-header>
        <v-expansion-panel-content class="overflow-y-scroll h-[800px]">
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
                  <CurrencyFormatter
                    :amount="product.product.price"
                  ></CurrencyFormatter>
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
            <currency-formatter class="ml-auto" :amount="String(totalPrice)" />
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="hidden md:block md:h-[800px] overflow-y-scroll md:w-1/2">
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
              <CurrencyFormatter
                :amount="product.product.price"
              ></CurrencyFormatter>
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
        <currency-formatter class="ml-auto" :amount="String(totalPrice)" />
        <div class="w-3/4 mb-5" @click="updateCart(cartItems)">
          <base-button class="w-full" :title="'Update'"></base-button>
        </div>
      </ul>
    </div>

    <section class="md:w-1/2 md:p-4">
      <h2>Ship Information</h2>
      <div class="md:flex md:items-center gap-4 mt-5">
        <div class="flex items-center gap-3">
          <font-awesome-icon
            :icon="['fas', 'user']"
            size="lg"
            style="color: #000000"
          />
          <div>
            <p class="mb-0">{{ currentUser.name }}({{ currentUser.email }})</p>
          </div>
        </div>

        <div class="mt-5" @click="logout">
          <base-button :title="'Logout'"></base-button>
        </div>
      </div>
      <validation-observer class="w-1/2" ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit(formCheckout)">
          <validation-provider
            v-slot="{ errors }"
            name="address"
            rules="required|max:100"
          >
            <v-text-field
              v-model="address"
              :error-messages="errors"
              label="Address"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
          >
            <v-text-field
              v-model="name"
              :error-messages="errors"
              label="Name"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="phone"
            rules="{
            required: true,
            regex: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
          }"
          >
            <v-text-field
              v-model="phoneNumber"
              :error-messages="errors"
              label="Phone"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="checkbox"
          >
            <v-checkbox
              v-model="checkbox"
              :error-messages="errors"
              value="1"
              label="I certify that this information is correct"
              type="checkbox"
              required
            ></v-checkbox>
          </validation-provider>

          <h2 class="font-bold text-xl">Payments Methods</h2>

          <div class="mt-3">
            <h4>Ship Methods</h4>
            <div class="flex p-3 gap-3 border border-gray-200 rounded-lg mt-3">
              <input
                id="ship"
                v-model="shipFee"
                type="radio"
                name="ship-methods"
                value="35000"
              />
              <label class="max-w-max" for="ship">Delivery</label>
              <!-- <label class="ml-auto" for="fee-ship">{{ shipFee }}</label> -->
              <currency-formatter class="ml-auto" :amount="shipFee" />
            </div>
          </div>

          <div class="mt-3">
            <h4>Payments Methods</h4>

            <div class="flex p-3 gap-3 border border-gray-200 rounded-lg mt-3">
              <input
                id="delivery_payments"
                v-model="paymentsMethods"
                type="radio"
                name="payments_methods"
                value="delivery_payments"
              />
              <label class="max-w-max" for="delivery_payments"
                >Payment on delivery(COD)</label
              >
              <!-- <label class="ml-auto" for="fee-ship">{{ paymentsMethods }}</label> -->
              <currency-formatter class="ml-auto" :amount="totalPayment" />
            </div>

            <div class="flex p-3 gap-3 border border-gray-200 rounded-lg mt-3">
              <input
                id="transfer_payments"
                v-model="paymentsMethods"
                type="radio"
                name="payments_methods"
                value="transfer_payments"
              />
              <label class="max-w-max" for="transfer_payments"
                >Bank transfer</label
              >
              <currency-formatter class="ml-auto" :amount="totalPayment" />
            </div>

            <div class="flex p-3 gap-3 border border-gray-200 rounded-lg mt-3">
              <input
                id="momo_payments"
                v-model="paymentsMethods"
                type="radio"
                name="payments_methods"
                value="momo_payments"
              />
              <label class="max-w-max" for="momo_payments">Pay with MOMO</label>
              <currency-formatter class="ml-auto" :amount="totalPayment" />
            </div>
          </div>

          <v-btn class="mt-5 mr-4" type="submit" :disabled="invalid">
            submit
          </v-btn>
          <v-btn class="mt-5" @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

import BaseButton from '~/components/UI/Button/BaseButton.vue'
import CurrencyFormatter from '~/components/UI/CurrencyFormatter.vue'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})
export default {
  components: {
    BaseButton,
    ValidationProvider,
    ValidationObserver,
    CurrencyFormatter,
  },
  data() {
    return {
      name: '',
      phoneNumber: '',
      email: '',
      checkbox: null,
      address: '',
      shipFee: '',
      paymentsMethods: '',
      transferFee: '',
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'login/currentUser',
      cartItems: 'cart/cartItems',
      totalPrice: 'cart/totalPrice',
    }),
    formCheckout() {
      return {
        order_date: new Date(),
        name: this.name,
        address: this.address,
        phone: this.phoneNumber,
        email: this.email,
        paymentsMethods: this.paymentsMethods,
        totalPayment: this.totalPayment,
      }
    },

    formPayments() {
      return {
        shipFee: this.shipFee,
        paymentsMethods: this.paymentsMethods,
        totalPayment: this.totalPayment,
      }
    },

    totalPayment() {
      return String(this.totalPrice + +this.shipFee + this.transferFee)
    },
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
      updateCart: 'cart/updateCart',
      addOrders: 'checkout/addOrders',
    }),
    ...mapMutations({
      updateQuantity: 'cart/updateQuantity',
    }),

    submit(form) {
      this.$refs.observer.validate()
      this.addOrders({ form, cartItems: this.cartItems })
    },
    clear() {
      this.name = ''
      this.phoneNumber = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$refs.observer.reset()
    },
  },
}
</script>

<style scoped>
@media (min-width: 426px) {
  .v-expansion-panels {
    width: 50%;
    display: none;
  }
  .v-application p {
    margin-bottom: 0;
  }
}
</style>
