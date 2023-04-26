<template>
  <div>
    <h4
      class="text-sm font-medium uppercase"
      :class="idTab === menu.id ? 'text-black' : 'text-gray-400'"
      @click="setIdTab(menu.id)"
    >
      {{ menu.title }}
    </h4>
    <slot></slot>
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
    idTab: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  methods: {
    setIdTab(data) {
      this.$emit('set-id-tab', data)
      // eslint-disable-next-line no-console
      console.log('go this')
    },
  },
}
</script>

<style></style>
