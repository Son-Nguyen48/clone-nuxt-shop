<template>
  <div class="gap-2">
    <button
      class="flex justify-center items-center w-10 h-10 remove-hightlight rounded-full bg-black relative"
      @click.stop="isShowSearchBar = !isShowSearchBar"
    >
      <font-awesome-icon
        :icon="['fas', 'magnifying-glass']"
        style="color: #000000"
        size="lg"
        class="filter brightness-0 invert"
      />
    </button>
    <client-only>
      <search-bar
        v-show="isShowSearchBar"
        class="absolute -bottom-16 right-14 w-60 shadow-[0_2px_4px_0_rgba(0,0,0,0.8)]"
      ></search-bar>
    </client-only>

    <nuxt-link
      to="/account/user"
      class="flex justify-center items-center w-10 h-10 remove-hightlight rounded-full bg-black"
    >
      <font-awesome-icon
        :icon="['fas', 'user']"
        style="color: #000000"
        size="lg"
        class="filter brightness-0 invert"
      />
    </nuxt-link>

    <nuxt-link
      to="/cart"
      class="flex justify-center items-center w-10 h-10 remove-hightlight rounded-full bg-black"
    >
      <v-badge
        :content="itemsQuantity"
        :value="itemsQuantity"
        color="green"
        overlap
      >
        <font-awesome-icon
          :icon="['fas', 'cart-shopping']"
          style="color: #000000"
          size="lg"
          class="filter brightness-0 invert"
        />
      </v-badge>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBar from './SearchBar.vue'
export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      isShowSearchBar: false,
    }
  },
  computed: {
    ...mapGetters({
      itemsQuantity: 'cart/itemsQuantity',
    }),
  },
}
</script>

<style scoped>
.v-badge__wrapper span.v-badge__badge {
  background-color: green;
}
</style>
