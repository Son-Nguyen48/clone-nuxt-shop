<template>
  <div>
    <cart-link></cart-link>

    <hamburger-button></hamburger-button>
  </div>
</template>

<script>
import CartLink from '../UI/Button/CartLink.vue'
import HamburgerButton from '../UI/Button/HamburgerButton.vue'

export default {
  components: {
    CartLink,
    HamburgerButton,
  },
}
</script>

<style scoped>
.hamburger-menu {
  transition: all 0ms 100ms, width 150ms linear;
}

.hamburger-menu::before,
.hamburger-menu::after {
  content: '';
  position: absolute;
  right: 0;
  background: #252a2b;
  transition: bottom 300ms 100ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 300ms cubic-bezier(0.23, 1, 0.32, 1), width 150ms linear,
    background 150ms linear;
  width: 27px;
  height: 3px;
}
.hamburger-menu::before {
  bottom: 7px;
}
.hamburger-menu::after {
  top: 7px;
}
</style>
