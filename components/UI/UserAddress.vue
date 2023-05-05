<template>
  <div>
    <h4 class="grid grid-cols-2 px-2">
      <div class="flex justify-center md:justify-normal py-2">
        <span>{{ user.name }}</span>
      </div>

      <!-- <div class="flex justify-end gap-2 py-2">
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          style="color: #000000"
        />
        <font-awesome-icon :icon="['fas', 'xmark']" style="color: #000000" />
      </div> -->
    </h4>
    <form action="#" class="px-2">
      <div>
        <label type="text">{{ user.name }}</label>
      </div>
      <label for="company">Company: </label>
      <label type="text">{{ user.company }}</label> <br />
      <label for="address">Address: </label>
      <label type="text">{{ user.address }}</label> <br />
      <label for="phone">Phone: </label>
      <label type="text">{{ user.phone }}</label>
    </form>
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
    await this.$axios.$get('/currentUser').then((response) => {
      this.user = response[0]
    })
  },
}
</script>

<style></style>
