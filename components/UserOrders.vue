<template>
  <div>
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item.id">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.id">
        This is cartItems:
        {{ item.data[0] }}
        <hr />
        <ul>
          <li v-for="product in item.data" :key="product.id">
            <span>{{ product }}</span>
            <hr />
          </li>
        </ul>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      tab: null,
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

<style></style>
