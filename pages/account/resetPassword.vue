<template>
  <div class="md:pt-[185px] md:pb-20">
    <div class="px-2 md:flex">
      <h2
        class="text-3xl font-bold py-10 text-center md:w-1/2 md:border-r md:border-gray-400"
      >
        Password Recovery
      </h2>
      <div class="px-2 w-1/2 text-center">
        <input
          class="py-2 px-3 bg-gray-200 w-3/4 my-5 md:mt-2 rounded"
          type="email"
          placeholder="Email"
        />
        <div class="flex justify-center">
          <base-button :title="'Send'" class="mr-2"></base-button>
          <nuxt-link to="/account/login">
            <base-button :title="'Cancel'"></base-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
