<template>
  <span>{{ formattedAmount }}</span>
</template>

<script>
export default {
  props: {
    amount: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedAmount() {
      let price = ''
      if (typeof this.amount === 'string') {
        price = parseInt(this.amount)
      }

      if (!this.amount) return ''
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      })
      return formatter.format(price)
    },
  },
}
</script>
