<template>
  <section class="pt-11">
    <div class="text-center">
      <h2 class="text-[28px] leading-[1.6] font-medium hover:text-[#fcda00]">
        <nuxt-link to="/collections/bestseller">BEST SELLER</nuxt-link>
      </h2>
    </div>

    <the-collection></the-collection>

    <div class="text-center mt-20">
      <nuxt-link
        to="/collections/bestseller"
        class="uppercase inline-block py-3 px-5 font-bold text-white bg-[#FCDA00]"
        >See more</nuxt-link
      >
    </div>
  </section>
</template>

<script>
import TheCollection from '../The-collection/TheCollection.vue'
export default {
  components: {
    TheCollection,
  },
  props: {},
}
</script>

<style></style>
