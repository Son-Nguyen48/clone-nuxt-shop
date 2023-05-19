<template>
  <div class="md:px-9 md:pt-[105px]">
    <div v-show="hasData">
      <section class="px-3">
        <div>
          <img :src="collection.image_src" alt="collection img" />
        </div>

        <h2 class="font-bold text-sm text-[#333333] mt-8">
          {{ collection.title }}
        </h2>
        <p class="mt-8">{{ collection.description }}</p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-center mt-8">
          {{ collection.titleHeader }}
        </h2>

        <div
          class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
        >
          <card-item
            v-for="product in currentProducts"
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
        :total-visible="7"
        :prev-icon="$vuetify.icons.prevPage"
        :next-icon="$vuetify.icons.nextPage"
      ></v-pagination>
    </div>
    <div v-show="!hasData">
      <h1 class="text-3xl font-bold text-center pt-20">
        New collection will be updated soon
      </h1>
      <img
        class="mx-auto"
        src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1683819537~exp=1683820137~hmac=1ad9d504bbcb75909972b5c6ec27bf34830e2619d9986bec3b4c156f8e5732a8"
        alt="fallback"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CardItem from '~/components/UI/CardItem.vue'
export default {
  components: { CardItem },
  data() {
    return {
      currentPage: 1,
      pageSize: 10, // số bản ghi tối đa cho mỗi trang,
      hasData: true,
    }
  },
  computed: {
    ...mapState('collections', {
      collection: (state) => state.collection,
    }),

    ...mapGetters({
      listProduct: 'collections/listProduct',
    }),

    currentProducts() {
      if (this.listProduct) {
        return this.listProduct.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        )
      }
      return []
    },
    //
    totalPages() {
      if (this.listProduct && this.listProduct.length) {
        return Math.ceil(this.listProduct.length / this.pageSize)
      }
      return 0
    },
    hasDataCollection() {
      return Object.keys(this.collection).length
    },
  },
  created() {
    this.getCollection(this.$route.params.idCollections).catch(() => {
      this.hasData = false
    })
  },

  methods: {
    ...mapActions('collections', {
      getCollection: 'getCollection',
      getListFilter: 'getListFilter',
    }),
  },
}
</script>

<style></style>
