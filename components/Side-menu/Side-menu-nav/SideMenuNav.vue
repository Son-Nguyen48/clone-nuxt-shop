<template>
  <div>
    <top-side-nav></top-side-nav>
    <main-side-nav></main-side-nav>
    <support-side-nav></support-side-nav>
    <login-side-nav></login-side-nav>
    <bottom-side-nav></bottom-side-nav>
  </div>
</template>

<script>
import TopSideNav from './Top-side-nav/TopSideNav.vue'
import MainSideNav from './Main-side-nav/MainSideNav.vue'
import SupportSideNav from './Support-side-nav/SupportSideNav.vue'
import LoginSideNav from './Login-side-nav/LoginSideNav.vue'
import BottomSideNav from './Bottom-side-nav/BottomSideNav.vue'
export default {
  components: {
    TopSideNav,
    MainSideNav,
    SupportSideNav,
    LoginSideNav,
    BottomSideNav,
  },
}
</script>

<style></style>
