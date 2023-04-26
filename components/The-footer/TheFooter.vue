<template>
  <div class="mt-[15px]">
    <top-footer class="bg-[#f3f3f3]"></top-footer>
    <support-footer></support-footer>
    <main-footer></main-footer>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import BottomFooter from './Bottom-footer/BottomFooter.vue'
import MainFooter from './Main-footer/MainFooter.vue'
import SupportFooter from './Support-footer/SupportFooter.vue'
import TopFooter from './Top-footer/TopFooter.vue'
export default {
  components: {
    TopFooter,
    SupportFooter,
    MainFooter,
    BottomFooter,
  },
}
</script>

<style></style>
