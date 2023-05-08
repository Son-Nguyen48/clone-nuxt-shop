<template>
  <div class="md:pt-[105px]">
    <div
      class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
    >
      <card-item
        v-for="product in currentBestseller"
        :key="product.id"
        :product="product"
      ></card-item>
    </div>

    <v-pagination
      v-model="currentPage"
      color="#FFDD00"
      class="py-8"
      :length="totalPages"
      :total-visible="7"
      :prev-icon="$vuetify.icons.prevPage"
      :next-icon="$vuetify.icons.nextPage"
      @input="getProducts"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardItem from '~/components/UI/CardItem.vue'
export default {
  components: {
    CardItem,
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 10, // số bản ghi tối đa cho mỗi trang
    }
  },

  computed: {
    ...mapGetters({
      originBestseller: 'bestseller/listBestseller',
    }),

    currentBestseller() {
      return this.originBestseller.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      )
    },

    totalPages() {
      return Math.ceil(this.originBestseller.length / this.pageSize)
    },
  },

  mounted() {
    this.getProducts()
  },

  methods: {
    getProducts() {
      this.$store.dispatch('bestseller/getListProduct')
    },
  },
}
</script>

<style scoped></style>
