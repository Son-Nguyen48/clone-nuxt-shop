<template>
  <div>
    <ul class="flex gap-2 overflow-x-scroll md:overflow-hidden px-2">
      <li
        v-for="item in items"
        :key="item.id"
        role="button"
        class="border border-gray-200 rounded-md transition-all ease-linear duration-300 hover:bg-[#FFDD00] hover:text-white"
        :class="tab === item.id ? 'bg-[#FFDD00] text-white' : ''"
        @click="tab = item.id"
      >
        <h4 class="p-3 min-w-max">{{ item.title }}</h4>
      </li>
    </ul>

    <ul class="py-5 px-2">
      <li v-for="item in items" v-show="tab === item.id" :key="item.id">
        <div>
          <ul>
            <li v-for="product in item.data" :key="product.id" class="pt-5">
              <div class="flex gap-5 pb-5">
                <div class="pr-5 border-r-2 border-gray-300">
                  <nuxt-link
                    v-for="productItem in product.cartItems"
                    :key="productItem.id"
                    :to="`/products/${productItem.product.id}`"
                    class="flex gap-2"
                  >
                    <img
                      class="h-20 w-20"
                      :src="productItem.product.image_src"
                      alt="productItem"
                    />

                    <div>
                      <p class="font-bold">
                        {{ productItem.product.name }}
                      </p>
                      <CurrencyFormatter
                        :amount="productItem.product.price"
                      ></CurrencyFormatter>
                    </div>
                  </nuxt-link>
                </div>
                <div>
                  <h4 class="font-bold text-xl">Shooz Vietnam</h4>
                  <p>
                    Order is
                    {{
                      product.orderStatus === 'pending'
                        ? 'pending'
                        : product.orderStatus === 'wait_to_pay'
                        ? 'waiting to pay'
                        : product.orderStatus === 'transport'
                        ? 'transporting'
                        : product.orderStatus === 'delivering'
                        ? 'delivering'
                        : 'complete'
                    }}
                  </p>
                  <p>Receiver: {{ product.name }}</p>
                  <p>Delivery address: {{ product.address }}</p>
                  <p>Payment methods: {{ product.paymentsMethods }}</p>
                  <v-btn
                    v-show="product.orderStatus === 'pending'"
                    class="my-5"
                    @click="cancelOrder(product.id)"
                    >Cancel</v-btn
                  >
                  <!-- <p>{{ product.id }}</p> -->
                </div>
              </div>

              <hr />
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CurrencyFormatter from './UI/CurrencyFormatter.vue'
export default {
  components: {
    CurrencyFormatter,
  },
  data() {
    return {
      tab: 2,
    }
  },
  computed: {
    ...mapGetters({
      orders: 'checkout/orders',
    }),

    currentUser() {
      return JSON.parse(localStorage.getItem('currentUser'))
    },

    ordersFilter() {
      return this.orders.filter((order) => {
        return order.userId === this.currentUser.id
      })
    },

    items() {
      return [
        {
          id: 1,
          title: 'All',
          data: this.ordersFilter,
        },
        {
          id: 2,
          title: 'Pending',
          data: this.ordersFilter.filter((item) => {
            return item.orderStatus === 'pending'
          }),
        },
        {
          id: 3,
          title: 'Wait for pay',
          data: this.ordersFilter.filter((item) => {
            return item.orderStatus === 'wait_to_pay'
          }),
        },
        {
          id: 4,
          title: 'Transport',
          data: this.ordersFilter.filter((item) => {
            return item.orderStatus === 'transport'
          }),
        },
        {
          id: 5,
          title: 'Delivering',
          data: this.ordersFilter.filter((item) => {
            return item.orderStatus === 'delivering'
          }),
        },
        {
          id: 6,
          title: 'Complete',
          data: this.ordersFilter.filter((item) => {
            return item.orderStatus === 'complete'
          }),
        },
      ]
    },
  },

  async created() {
    await this.getOrders()
    console.log(this.items[0].data[0]?.cartItems[0].product, 'items')
  },

  methods: {
    ...mapActions({
      getOrders: 'checkout/getOrders',
      cancelOrder: 'checkout/cancelOrder',
    }),
  },
}
</script>

<style scoped>
.v-item-group.theme--light.v-slide-group.v-slide-group--is-overflowing.v-tabs-bar.v-tabs-bar--is-mobile.primary--text {
  display: block;
}
</style>
