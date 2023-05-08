<template>
  <div class="md:px-3">
    <h4 class="py-5">Filter</h4>
    <v-row justify="center">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="item in allFilters" :key="item.id">
          <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <ul>
              <li v-for="option in item.listFilter" :key="option">
                <p
                  role="button"
                  class="hover:text-[#FFDD00]"
                  @click="doFilter(item.name, option)"
                >
                  {{ option }}
                </p>
              </li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      allFilters: 'filter/all',
    }),
  },
  created() {
    this.$store.dispatch('filter/getFilters')
  },
  methods: {
    doFilter(name, option) {
      this.$emit('do-filter', name.toLowerCase(), option)
    },
  },
}
</script>

<style scoped>
button.v-expansion-panel-header {
  justify-content: space-between;
}
@media (max-width: 425px) {
  .v-expansion-panel {
    flex: 1 0 100%;
  }
}

@media (min-width: 426px) {
  .v-expansion-panel {
    flex: 1 0;
  }
}
</style>
