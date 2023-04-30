<template>
  <div>
    <div v-click-outside="hide" @click="toggle">Toggle</div>
    <div v-show="opened">Popup item</div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  // do not forget this section
  directives: {
    ClickOutside,
  },

  data() {
    return {
      opened: false,
    }
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },

  methods: {
    toggle() {
      this.opened = true
    },

    hide() {
      this.opened = false
    },
  },
}
</script>
