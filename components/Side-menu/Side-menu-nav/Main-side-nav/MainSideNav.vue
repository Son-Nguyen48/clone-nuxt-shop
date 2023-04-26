<template>
  <div>
    <tab-view
      v-for="(menu, index) in MainSideNavs"
      :key="menu.id"
      class="py-[15px] lg:inline-block lg:p-3"
      :menu="menu"
      :index="index"
      @toggle-tab="toggleTab"
    >
      <transition name="rotate" appear mode="out-in">
        <component :is="menu.component" :component="menu.component"></component>
      </transition>
    </tab-view>
  </div>
</template>

<script>
import BrandMenu from './BrandMenu.vue'
import NewArrivalMenu from './NewArrivalMenu.vue'
import WomanMenu from './WomanMenu.vue'
import ManMenu from './ManMenu.vue'
import ChildrenMenu from './ChildrenMenu.vue'
import UnisexMenu from './UnisexMenu.vue'
import BackpackMenu from './BackpackMenu.vue'
import SaleMenu from './SaleMenu.vue'
import TabView from '~/components/UI/TabView.vue'
export default {
  components: {
    TabView,
    BrandMenu,
    NewArrivalMenu,
    WomanMenu,
    ManMenu,
    ChildrenMenu,
    UnisexMenu,
    BackpackMenu,
    SaleMenu,
  },
  data() {
    return {
      MainSideNavs: [
        {
          id: 1,
          title: 'BRAND',
          component: 'brand-menu',
          isTabOpen: false,
        },
        {
          id: 2,
          title: 'NEW ARRIVAL',
          component: 'new-arrival-menu',
          isTabOpen: false,
        },
        {
          id: 3,
          title: 'WOMAN',
          component: 'woman-menu',
          isTabOpen: false,
        },
        {
          id: 4,
          title: 'MAN',
          component: 'man-menu',
          isTabOpen: false,
        },
        {
          id: 5,
          title: 'UNISEX',
          component: 'unisex-menu',
          isTabOpen: false,
        },
        {
          id: 6,
          title: 'CHILDREN',
          component: 'children-menu',
          isTabOpen: false,
        },
        {
          id: 7,
          title: 'BACKPACK',
          component: 'backpack-menu',
          isTabOpen: false,
        },
        {
          id: 8,
          title: 'SALE',
          component: 'sale-menu',
          isTabOpen: false,
        },
      ],
    }
  },
  methods: {
    toggleTab(data) {
      this.MainSideNavs[data].isTabOpen = !this.MainSideNavs[data].isTabOpen
    },
  },
}
</script>

<style></style>
