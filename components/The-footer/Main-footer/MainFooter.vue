<template>
  <div class="p-[15px]">
    <ul
      class="grid grid-cols-1 md:grid-cols-5 md:gap-4 md:justify-items-center"
    >
      <li
        v-for="(menu, index) in MainFooterMenus"
        :key="menu.id"
        class="py-[15px]"
      >
        <tab-view :menu="menu" :index="index" @toggle-tab="toggleTab">
          <component :is="menu.component"></component>
        </tab-view>
      </li>
    </ul>
  </div>
</template>

<script>
import ShopInfor from './ShopInfor.vue'
import ContactInfor from './ContactInfor.vue'
import PaymentMethods from './PaymentMethods.vue'
import FooterSupport from './FooterSupport.vue'
import FooterPolicy from './FooterPolicy.vue'
import TabView from '~/components/UI/TabView.vue'
export default {
  components: {
    TabView,
    ShopInfor,
    ContactInfor,
    PaymentMethods,
    FooterSupport,
    FooterPolicy,
  },
  data() {
    return {
      isShowDetail: false,
      MainFooterMenus: [
        {
          id: 1,
          title: 'Ha fashion joint stock company',
          component: 'shop-infor',
          isTabOpen: false,
        },
        {
          id: 2,
          title: 'Contact Info',
          component: 'contact-infor',
          isTabOpen: false,
        },
        {
          id: 3,
          title: 'Payment Methods',
          component: 'payment-methods',
          isTabOpen: false,
        },
        {
          id: 4,
          title: 'Footer Support',
          component: 'footer-support',
          isTabOpen: false,
        },
        {
          id: 5,
          title: 'Footer Policy',
          component: 'footer-policy',
          isTabOpen: false,
        },
      ],
    }
  },

  methods: {
    toggleTab(data) {
      this.MainFooterMenus[data].isTabOpen =
        !this.MainFooterMenus[data].isTabOpen
    },
  },
}
</script>

<style scoped></style>
