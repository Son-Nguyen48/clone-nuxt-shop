<template>
  <div class="px-2">
    <h3>User info:</h3>
    <p>{{ user.name }}</p>
    <br />
    <p>{{ user.email }}</p>
    <p>{{ user.nationality }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
    }
  },
  async created() {
    await this.$axios.$get('/user').then((response) => {
      this.user = response[0]
    })
  },
}
</script>

<style></style>
