<template>
  <div class="p-[5px]">
    <div class="search-box">
      <form action="#" class="relative">
        <div>
          <input
            v-model="searchInput"
            v-click-outside="isSearchResultShow"
            type="text"
            class="pl-[22px] pr-[55px] w-full bg-gray-100 md:py-3 md:px-5"
            placeholder="Search product"
            @input="debounceSearch()"
          />
        </div>

        <button
          type="submit"
          class="absolute top-1/2 right-3 transform -translate-y-1/2"
        >
          <svg
            version="1.1"
            class="svg search h-[15px] w-[15px] text-gray-50"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 24 27"
            style="enable-background: new 0 0 24 27"
            xml:space="preserve"
          >
            <path
              d="M10,2C4.5,2,0,6.5,0,12s4.5,10,10,10s10-4.5,10-10S15.5,2,10,2z M10,19c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S13.9,19,10,19z"
            ></path>
            <rect
              x="17"
              y="17"
              transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.2844 19.5856)"
              width="4"
              height="8"
            ></rect>
          </svg>
        </button>

        <!-- Fix search result don't hidden  -->
        <ul
          v-show="isSearchResultShow"
          class="fixed top-36 left-0 z-[1000] bg-white w-full md:absolute md:right-0 md:h-[300px] md:top-full transform translate-y-3 md:w-[300px] h-full overflow-y-scroll"
        >
          <li v-for="result in results" :key="result.id" class="p-2">
            <a class="flex gap-2" @click="goToProduct(result)">
              <div class="md:w-3/5">
                <p>{{ result.title }}</p>
                <p>{{ result.price }}</p>
              </div>
              <div class="md:w-2/5">
                <img
                  class="w-10 h-10 md:w-20 md:h-20"
                  :src="result.src"
                  alt="img"
                />
              </div>
            </a>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      results: [],
      debounce: null,
      isSearchResultShow: false,
    }
  },
  watch: {
    $route(from, to) {
      this.isSearchResultShow = false
    },
  },
  methods: {
    debounceSearch() {
      if (this.searchInput) this.isSearchResultShow = true
      if (this.debounce) clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.getResults(this.searchInput)
      }, 500)
    },

    getResults(query) {
      this.$axios
        .$get(`/products?q=${query}`)
        .then((response) => {
          // eslint-disable-next-line no-console
          this.results = response.slice(0, 10)
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    },

    goToProduct(result) {
      // eslint-disable-next-line no-console
      console.log('here')
      this.$router.push(`/products/${result.id}`)
    },
  },
}
</script>

<style scoped></style>
