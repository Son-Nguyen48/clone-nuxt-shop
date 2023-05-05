<template>
  <div class="md:pt-[105px]">
    <the-filter @do-filter="doFilter"></the-filter>
    <div
      class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
    >
      <card-item
        v-for="product in currentProductItems"
        :key="product.id"
        :product="product"
      ></card-item>
    </div>
    <v-pagination
      v-model="currentPage"
      color="#FFDD00"
      class="py-8"
      :length="totalPages"
      :prev-icon="$vuetify.icons.prevPage"
      :next-icon="$vuetify.icons.nextPage"
      @input="getListProducts"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheFilter from '~/components/The-filter/TheFilter.vue'
import CardItem from '~/components/UI/CardItem.vue'
export default {
  components: {
    CardItem,
    TheFilter,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20, // số bản ghi tối đa cho mỗi trang
    }
  },
  computed: {
    ...mapGetters({
      productFilter: 'product/productFilter',
    }),

    currentProductItems() {
      return this.productFilter.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      )
    },

    totalPages() {
      return Math.ceil(this.productFilter.length / this.pageSize)
    },
  },
  async created() {
    await this.getListProducts()
    await this.getListFilter()
  },
  methods: {
    ...mapActions('product', {
      getListFilter: 'getListFilter',
      getListProducts: 'getListProducts',
    }),

    doFilter(name, data) {
      // eslint-disable-next-line no-console
      console.log(name, 'name', data, 'data')
      this.getListFilter({ name, data })
    },
  },
}
</script>

<style></style>
