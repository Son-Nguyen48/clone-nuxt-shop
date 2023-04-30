<template>
  <div class="lg:flex gap-8">
    <div class="text-center" data-app>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ on, attrs }">
          <a
            role="button"
            color="black"
            class="bg-transparent font-bold text-sm"
            v-bind="attrs"
            @click="$router.push('/collections/brand-menu')"
            v-on="on"
          >
            BRAND
          </a>
        </template>

        <v-list class="flex">
          <v-list-item v-for="(item, index) in brand" :key="index" class="p-0">
            <nuxt-link :to="`/collections/${index}`" class="w-full rounded">
              <v-list-item-title>
                <v-btn class="w-full">
                  {{ item.name }}
                </v-btn>
              </v-list-item-title>
            </nuxt-link>
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
            @click="$router.push('/collections/new-arrival')"
            v-on="on"
          >
            NEW ARRIVAL
          </a>
        </template>

        <v-list class="flex">
          <v-list-item
            v-for="(item, index) in newArrival"
            :key="index"
            class="p-0"
          >
            <nuxt-link
              :to="`/collections/${item.name.toLowerCase()}`"
              class="w-full rounded"
            >
              <v-list-item-title>
                <v-btn class="w-full">
                  {{ item.name }}
                </v-btn>
              </v-list-item-title>
            </nuxt-link>
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
            @click="$router.push('/collections/woman-menu')"
            v-on="on"
          >
            WOMAN
          </a>
        </template>

        <v-list class="flex">
          <v-list-item v-for="(item, index) in woman" :key="index" class="p-0">
            <nuxt-link
              :to="`/collections/${item.name.toLowerCase()}`"
              class="w-full rounded"
            >
              <v-list-item-title>
                <v-btn class="w-full">
                  {{ item.name }}
                </v-btn>
              </v-list-item-title>
            </nuxt-link>
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
            @click="$router.push('/collections/man-menu')"
            v-on="on"
          >
            MAN
          </a>
        </template>

        <v-list class="flex">
          <v-list-item v-for="(item, index) in man" :key="index" class="p-0">
            <nuxt-link
              :to="`/collections/${item.name.toLowerCase()}`"
              class="w-full rounded"
            >
              <v-list-item-title>
                <v-btn class="w-full">
                  {{ item.name }}
                </v-btn>
              </v-list-item-title>
            </nuxt-link>
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
            @click="$router.push('/collections/unisex-menu')"
            v-on="on"
          >
            UNISEX
          </a>
        </template>

        <v-list class="flex">
          <v-list-item v-for="(item, index) in unisex" :key="index" class="p-0">
            <nuxt-link
              :to="`/collections/${item.name.toLowerCase()}`"
              class="w-full rounded"
            >
              <v-list-item-title>
                <v-btn class="w-full">
                  {{ item.name }}
                </v-btn>
              </v-list-item-title>
            </nuxt-link>
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
            @click="$router.push('/collections/children-menu')"
            v-on="on"
          >
            CHILDREN
          </a>
        </template>

        <v-list class="flex">
          <v-list-item
            v-for="(item, index) in children"
            :key="index"
            class="p-0"
          >
            <nuxt-link
              :to="`/collections/${item.name.toLowerCase()}`"
              class="w-full rounded"
            >
              <v-list-item-title>
                <v-btn class="w-full">
                  {{ item.name }}
                </v-btn>
              </v-list-item-title>
            </nuxt-link>
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
            @click="$router.push('/collections/backpack-menu')"
            v-on="on"
          >
            BACKPACK
          </a>
        </template>

        <v-list class="flex">
          <v-list-item
            v-for="(item, index) in backpack"
            :key="index"
            class="p-0"
          >
            <nuxt-link
              :to="`/collections/${item.name.toLowerCase()}`"
              class="w-full rounded"
            >
              <v-list-item-title>
                <v-btn class="w-full">
                  {{ item.name }}
                </v-btn>
              </v-list-item-title>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      brand: [],
      newArrival: [],
      woman: [],
      man: [],
      unisex: [],
      children: [],
      backpack: [],
    }
  },
  created() {
    this.$axios.$get('/brand').then((res) => (this.brand = res))
    this.$axios.$get('/woman').then((res) => (this.woman = res))
    this.$axios.$get('/man').then((res) => (this.man = res))
    this.$axios.$get('/unisex').then((res) => (this.unisex = res))
    this.$axios.$get('/newArrival').then((res) => (this.newArrival = res))
    this.$axios.$get('/children').then((res) => (this.children = res))
    this.$axios.$get('/backpack').then((res) => (this.backpack = res))
  },
}
</script>

<style scoped>
.v-menu__content.theme--light.v-menu__content--fixed {
  top: 61px !important;
}

.v-menu__content.theme--light.v-menu__content--fixed::before {
  content: '';
  height: 100%;
}

.v-list.flex.v-sheet.theme--light {
  display: flex !important;
  flex-wrap: wrap !important;
  width: 100vw !important;
}

.p-0.v-list-item.theme--light {
  max-width: 300px !important;
}
</style>
