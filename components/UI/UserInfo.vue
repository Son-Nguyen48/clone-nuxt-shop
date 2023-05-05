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
    await this.$axios.$get('currentUser').then((res) => {
      if (res) this.user = res[0]
      // eslint-disable-next-line no-console
      console.log(this.user, 'user', res, 'res')
    })
  },
}
</script>

<style></style>
