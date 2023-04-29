<template>
  <div class="pt-[105px]">
    <section>
      <div
        class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
      >
        <card-item
          v-for="product in listProduct"
          :key="product.id"
          :product="product"
        ></card-item>
      </div>
    </section>
    <v-pagination
      v-model="currentPage"
      color="#FFDD00"
      class="py-8"
      :length="totalPages"
      :prev-icon="$vuetify.icons.prevPage"
      :next-icon="$vuetify.icons.nextPage"
      @input="getCollection"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CardItem from '~/components/UI/CardItem.vue'
export default {
  components: { CardItem },
  data() {
    return {
      currentPage: 1,
      pageSize: 10, // số bản ghi tối đa cho mỗi trang
    }
  },
  computed: {
    ...mapState('collections', {
      collection: (state) => state.collection,
    }),

    listProduct() {
      return this.collection.listProduct
    },

    currentBestseller() {
      return this.listProduct.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      )
    },

    // totalPages() {
    //   return Math.ceil(this.listProduct.length / this.pageSize)
    // },
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.$route.params.idCollections)
    this.getCollection(this.$route.params.idCollections)
  },
  methods: {
    ...mapActions('collections', {
      getCollection: 'getCollection',
    }),
  },
}
</script>

<style></style>
