<template>
  <div>
    <TheSlider />
    <TheBestseller />
    <TheFeature />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async created() {
    await this.$axios.$get('/user').then((response) => {
      this.$store.commit('login/setStateLogin', response[0].isLogin)
    })

    // eslint-disable-next-line no-console
    console.log(this.$store.state.login.isLogin, 'isLogin')
  },
}
</script>
