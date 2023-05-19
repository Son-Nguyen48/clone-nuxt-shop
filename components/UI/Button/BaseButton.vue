<template>
  <button
    type="submit"
    class="bg-[#FFDD00] inline-block py-3 px-3 text-white font-bold rounded"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: () => {},
    },
  },
}
</script>

<style></style>
