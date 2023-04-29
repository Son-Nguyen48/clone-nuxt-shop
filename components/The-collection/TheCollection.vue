<template>
  <div
    class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
  >
    <card-item
      v-for="product in listBestseller"
      :key="product.id"
      :product="product"
    ></card-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardItem from '../UI/CardItem.vue'

export default {
  components: {
    CardItem,
  },

  computed: {
    ...mapGetters({
      listBestseller: 'bestseller/listBestseller',
    }),
  },

  async created() {
    await this.$store.dispatch('bestseller/getListProductHomePage')
  },
}
</script>

<style></style>
