<template>
  <div class="p-2">
    <nuxt-link :to="`/products/${product.id}`">
      <div>
        <img :src="product.src" alt="" />
      </div>

      <div>
        <h4 class="font-bold">{{ product.title }}</h4>
        <p class="font-bold">{{ product.price }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
}
</script>

<style></style>
