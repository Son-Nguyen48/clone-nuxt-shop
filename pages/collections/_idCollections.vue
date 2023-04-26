<template>
  <div class="pt-[105px]">
    <section>
      <div>
        {{ listProduct }}
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('collections', {
      listProduct: (state) => state.listProduct,
    }),
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.$route.params.idCollections)
    this.getListProduct(this.$route.params.idCollections)
  },
  methods: {
    ...mapActions('collections', {
      getListProduct: 'getListProduct',
    }),
  },
}
</script>

<style></style>
