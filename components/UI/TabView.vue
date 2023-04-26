<template>
  <div>
    <h4
      role="button"
      class="text-sm uppercase font-bold flex justify-center remove-hightlight"
      @click="toggleTab(index)"
    >
      {{ menu.title }}
      <font-awesome-icon
        :icon="['fas', menu.isTabOpen === true ? 'chevron-up' : 'chevron-down']"
        class="ml-auto md:hidden"
        style="color: #000000"
      />
    </h4>

    <div v-show="menu.isTabOpen" class="transition-tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      require: true,
      default: () => {},
    },
    index: {
      type: Number,
      require: true,
      default: 0,
    },
  },

  methods: {
    toggleTab(data) {
      this.$emit('toggle-tab', data)
    },
  },
}
</script>

<style scoped>
.remove-hightlight {
  -webkit-tap-highlight-color: transparent;
}

.transition-tab-content {
  transition: display 0.3s ease 0s, visibility 0s linear 0.3s,
    z-index 0s linear 0.01s;
}
</style>
