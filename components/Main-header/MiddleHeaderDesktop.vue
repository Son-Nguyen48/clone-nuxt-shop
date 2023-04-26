<template>
  <div class="lg:flex gap-4">
    <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            v-on="on"
          >
            BRAND
          </a>
        </template>

        <v-list class="flex">
          <v-list-item v-for="(item, index) in brands" :key="index" class="p-0">
            <v-list-item-title>
              <v-btn class="w-full">
                <nuxt-link :to="`/collections/${item.name.toLowerCase()}`">{{
                  item.name
                }}</nuxt-link>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            v-on="on"
          >
            NEW ARRIVAL
          </a>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" class="p-0">
            <v-list-item-title>
              <v-btn class="w-full">{{ item.name }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            v-on="on"
          >
            WOMAN
          </a>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" class="p-0">
            <v-list-item-title>
              <v-btn class="w-full">{{ item.name }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            v-on="on"
          >
            UNISEX
          </a>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" class="p-0">
            <v-list-item-title>
              <v-btn class="w-full">{{ item.name }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            v-on="on"
          >
            CHILDREN
          </a>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" class="p-0">
            <v-list-item-title>
              <v-btn class="w-full">{{ item.name }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            v-on="on"
          >
            BACKPACK
          </a>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" class="p-0">
            <v-list-item-title>
              <v-btn class="w-full">{{ item.name }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            v-on="on"
          >
            SALE
          </a>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" class="p-0">
            <v-list-item-title>
              <v-btn class="w-full">{{ item.name }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      brands: [],
    }
  },
  created() {
    this.$axios.$get('/brands').then((res) => {
      this.brands = res
    })
  },
}
</script>
