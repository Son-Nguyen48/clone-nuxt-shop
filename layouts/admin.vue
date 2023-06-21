<template>
  <v-app>
    <header
      class="bg-[#FFDD00] flex justify-between px-7 border-b-2 border-gray-500"
    >
      <h1 class="text-4xl py-4 font-bold inline-block">
        <nuxt-link to="/admin">Admin</nuxt-link>
      </h1>

      <!-- <div class="my-auto">
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
      </div> -->
    </header>

    <main class="flex">
      <nav
        class="w-[300px] bg-[#FFDD00] border-r-2 border-gray-500 h-screen relative"
      >
        <ul class="h-full flex flex-col items-center pl-0">
          <li
            v-for="tab in tabs"
            :key="tab.id"
            class="transition-colors duration-75 opacity-50 hover:opacity-100 w-full py-3 px-7 border-b-2 border-gray-500"
          >
            <nuxt-link
              class="font-bold text-xl inline-block w-full"
              :to="`/admin/${tab.name.toLowerCase()}`"
              >{{ tab.name }}</nuxt-link
            >
          </li>
        </ul>
      </nav>
      <Nuxt :is-side-bar-show="isSideBarShow" />
    </main>
  </v-app>
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
        {
          id: 5,
          name: 'CurrentUser',
        },
      ],
      isLocked: false,
      isSideBarShow: true,
    }
  },
}
</script>

<style scoped>
.flex,
.child-flex > * {
  flex: 0;
}
</style>
