<template>
  <div class="md:pt-[105px]">
    <div
      class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
    >
      <card-item
        v-for="product in productItems"
        :key="product.id"
        :product="product"
      ></card-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardItem from '~/components/UI/CardItem.vue'
export default {
  components: {
    CardItem,
  },
  computed: {
    ...mapGetters({
      productItems: 'product/productItems',
    }),
  },
  async created() {
    await this.$store.dispatch('product/getListProducts')
  },
}
</script>

<style></style>
