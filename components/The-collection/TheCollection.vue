<template>
  <div
    class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
  >
    <card-item
      v-for="product in listProduct"
      :key="product.id"
      :product="product"
    ></card-item>
  </div>
</template>

<script>
import CardItem from '../UI/CardItem.vue'

export default {
  components: {
    CardItem,
  },
  data() {
    return {
      listProduct: [],
    }
  },

  async created() {
    await this.$store.dispatch('bestseller/getListProduct')
    this.listProduct = this.$store.state.bestseller.listProduct
  },
}
</script>

<style></style>
