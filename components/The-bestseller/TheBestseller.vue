<template>
  <section class="pt-11">
    <div class="text-center">
      <h2 class="text-[28px] leading-[1.6] font-medium hover:text-[#fcda00]">
        <nuxt-link to="/bestseller">BEST SELLER</nuxt-link>
      </h2>
    </div>

    <div
      class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
    >
      <card-item
        v-for="product in listBestseller"
        :key="product.id"
        :product="product"
      ></card-item>
    </div>

    <div class="text-center mt-20 h-16">
      <nuxt-link
        to="/bestseller"
        class="uppercase inline-block py-3 px-5 font-bold text-black bg-white hover:bg-[#FFDD00] hover:transform hover:-translate-y-2 hover:scale-105 transition-all ease-linear duration-300 rounded-lg border border-gray-500 hover:border-none"
        >See more</nuxt-link
      >
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CardItem from '../UI/CardItem.vue'
export default {
  components: {
    CardItem,
  },
  props: {},
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
