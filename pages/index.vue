<template>
  <div class="md:px-9">
    <TheSlider />
    <TheBestseller />
    <TheFeature />
    <collection-carousel></collection-carousel>
  </div>
</template>

<script>
import CollectionCarousel from '~/components/CollectionCarousel.vue'
export default {
  name: 'IndexPage',
  components: { CollectionCarousel },
}
</script>
