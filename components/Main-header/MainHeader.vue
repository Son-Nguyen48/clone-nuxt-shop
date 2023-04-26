<template>
  <div
    class="flex items-center justify-between py-[10px] px-3 fixed top-0 left-0 z-[100] bg-white w-full shadow-inset"
  >
    <left-header></left-header>

    <middle-header-desktop class="hidden lg:block"></middle-header-desktop>

    <right-header class="lg:hidden"></right-header>

    <right-header-desktop class="hidden lg:flex"></right-header-desktop>
  </div>
</template>

<script>
import MiddleHeaderDesktop from './MiddleHeaderDesktop.vue'
import RightHeaderDesktop from './RightHeaderDesktop.vue'
import LeftHeader from './LeftHeader.vue'
import RightHeader from './RightHeader.vue'
export default {
  components: {
    LeftHeader,
    RightHeader,
    RightHeaderDesktop,
    MiddleHeaderDesktop,
  },
}
</script>

<style scoped>
.shadow-inset {
  box-shadow: 0px -2px 0px 0px rgba(0, 0, 0, 0.08) inset;
}
</style>
