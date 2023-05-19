<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-7 mt-10 px-2 lg:h-[750px]">
    <div class="flex justify-center items-center">
      <img
        class="rounded-lg"
        src="https://theme.hstatic.net/1000376021/1000834008/14/pro_featured_img.png?v=3045"
        alt="feature"
      />
    </div>

    <div class="mt-10">
      <h3
        class="text-2xl text-[#000000] uppercase font-bold mx-0 mb-[15px] hover:text-[#FFDD00]"
      >
        <nuxt-link to="new-arrival" class="inline-block text-center p-5"
          >Holster - new arrival</nuxt-link
        >
      </h3>

      <ul class="grid md:grid-cols-3">
        <li
          v-for="(menu, index) in tabs"
          :key="menu.id"
          role="button"
          class="py-[15px] list-none text-center"
        >
          <tabs-view
            :idTab="idTab"
            :menu="menu"
            :index="index"
            @set-id-tab="setIdTab"
          >
          </tabs-view>
        </li>
      </ul>

      <hr />
      <br />

      <component
        :is="menu.component"
        v-for="menu in tabs"
        v-show="idTab === menu.id"
        :key="menu.id"
      ></component>

      <div class="w-full text-center mt-10">
        <nuxt-link
          to="/collections/holster"
          class="uppercase inline-block py-3 px-5 font-bold text-black bg-white hover:bg-[#FFDD00] hover:transform hover:-translate-y-2 hover:scale-105 transition-all ease-linear duration-300 rounded-lg border border-gray-500 hover:border-none"
          >See more</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import TabsView from '../UI/TabsView.vue'
import IntroduceView from './The-tabs/IntroduceView.vue'
import ProductCharacteristics from './The-tabs/ProductCharacteristics.vue'
import SizeView from './The-tabs/SizeView.vue'

export default {
  components: {
    TabsView,
    IntroduceView,
    ProductCharacteristics,
    SizeView,
  },
  data() {
    return {
      idTab: 1,
      tabs: [
        {
          id: 1,
          title: 'Introduce',
          component: 'introduce-view',
          isTabOpen: false,
        },

        {
          id: 2,
          title: 'Product characteristics',
          component: 'product-characteristics',
          isTabOpen: false,
        },
        {
          id: 3,
          title: 'Size',
          component: 'size-view',
          isTabOpen: false,
        },
      ],
    }
  },
  methods: {
    setIdTab(data) {
      this.idTab = data
    },
  },
}
</script>

<style></style>
