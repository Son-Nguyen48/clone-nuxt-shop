<template>
  <div class="flex__right-menu">
    <cart-link></cart-link>

    <nuxt-link
      to="/account/user"
      class="flex justify-center items-center w-10 h-10 rounded-full bg-black"
    >
      <font-awesome-icon
        :icon="['fas', 'user']"
        style="color: #000000"
        size="lg"
        class="filter brightness-0 invert"
      />
    </nuxt-link>

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

@media (max-width: 1023px) {
  .flex__right-menu {
    display: flex;
    gap: 10px;
  }
}
</style>
