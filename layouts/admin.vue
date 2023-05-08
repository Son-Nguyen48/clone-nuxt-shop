<template>
  <div>
    <header class="bg-[#FFDD00] flex justify-between px-7">
      <h1 class="text-4xl py-4 font-bold inline-block">
        <nuxt-link to="/admin">Admin</nuxt-link>
      </h1>

      <nav>
        <ul class="h-full flex gap-5 items-center">
          <li
            v-for="tab in tabs"
            :key="tab.id"
            class="transition-colors duration-75 hover:opacity-50"
          >
            <nuxt-link :to="`/admin/${tab.name.toLowerCase()}`">{{
              tab.name
            }}</nuxt-link>
          </li>
        </ul>
      </nav>

      <div class="my-auto">
        <div class="flex gap-4">
          <button class="p-3 rounded bg-white">
            <font-awesome-icon
              v-show="isLocked"
              :icon="['fas', 'lock']"
              size="lg"
              style="color: #000000"
            />

            <font-awesome-icon
              v-show="!isLocked"
              :icon="['fas', 'lock-open']"
              size="lg"
              style="color: #000000"
            />
          </button>
          <button class="p-3 rounded bg-white">
            <font-awesome-icon
              :icon="['fas', 'user']"
              size="lg"
              style="color: #000000"
            />
          </button>
        </div>
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: 'Products',
        },
        {
          id: 2,
          name: 'Orders',
        },
        {
          id: 3,
          name: 'Accounts',
        },
        {
          id: 4,
          name: 'Category',
        },
      ],
      isLocked: false,
    }
  },
}
</script>

<style></style>
