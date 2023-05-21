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
            <li v-for="product in item.data" :key="product.id">
              <div>
                <h4>Shooz Vietnam</h4>
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
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      tab: 1,
    }
  },
  computed: {
    ...mapGetters({
      orders: 'checkout/orders',
    }),

    items() {
      return [
        {
          id: 1,
          title: 'All',
          data: this.orders,
        },
        {
          id: 2,
          title: 'Wait for pay',
          data: this.orders.filter((item) => {
            return item.orderStatus === 'wait_to_pay'
          }),
        },
        {
          id: 3,
          title: 'Transport',
          data: this.orders.filter((item) => {
            return item.orderStatus === 'transport'
          }),
        },
        {
          id: 4,
          title: 'Delivering',
          data: this.orders.filter((item) => {
            return item.orderStatus === 'delivering'
          }),
        },
        {
          id: 5,
          title: 'Complete',
          data: this.orders.filter((item) => {
            return item.orderStatus === 'complete'
          }),
        },
      ]
    },
  },

  async created() {
    await this.getOrders()
    console.log(this.items[0].data[0].cartItems[0].product, 'items')
  },

  methods: {
    ...mapActions({
      getOrders: 'checkout/getOrders',
    }),
  },
}
</script>

<style scoped>
.v-item-group.theme--light.v-slide-group.v-slide-group--is-overflowing.v-tabs-bar.v-tabs-bar--is-mobile.primary--text {
  display: block;
}
</style>
