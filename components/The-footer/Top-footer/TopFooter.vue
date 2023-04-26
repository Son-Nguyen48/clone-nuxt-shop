<template>
  <div class="p-[15px] md:grid md:grid-cols-12 md:grid-flow-col md:gap-4">
    <subscribe-form class="col-span-8"></subscribe-form>
    <phone-contact class="col-span-4"></phone-contact>
  </div>
</template>

<script>
import PhoneContact from '~/components/UI/PhoneContact.vue'
import SubscribeForm from '~/components/UI/SubscribeForm.vue'

export default {
  components: {
    SubscribeForm,
    PhoneContact,
  },
}
</script>

<style></style>
