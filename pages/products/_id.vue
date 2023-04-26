<template>
  <div class="md:pt-[105px]">
    <div class="flex flex-col gap-6 md:flex-row md:p-20 md:h-[800px] py-20">
      <div class="md:w-1/2 flex justify-center items-center">
        <img
          class="shadow-[0_2px_12px_0_rgba(0,0,0,0.8)] rounded"
          :src="listProduct.src"
          alt="product"
        />
      </div>
      <div class="md:w-1/2 text-center flex flex-col gap-4">
        <h4 class="font-bold text-2xl">{{ listProduct.title }}</h4>
        <p>{{ listProduct.price }}</p>
        <div @click="addToCart">
          <base-button :title="'Add to cart'"></base-button>
        </div>
        <ul class="grid md:grid-cols-3">
          <li
            v-for="(menu, index) in tabs"
            :key="menu.id"
            role="button"
            class="py-[15px] list-none text-center"
          >
            <tabs-view
              :id_tab="idTab"
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
      </div>
    </div>
  </div>
</template>

<script>
import IntroduceView from '~/components/The-feature/The-tabs/IntroduceView.vue'
import ProductCharacteristics from '~/components/The-feature/The-tabs/ProductCharacteristics.vue'
import SizeView from '~/components/The-feature/The-tabs/SizeView.vue'
import BaseButton from '~/components/UI/Button/BaseButton.vue'
import TabsView from '~/components/UI/TabsView.vue'

export default {
  components: {
    BaseButton,
    TabsView,
    IntroduceView,
    ProductCharacteristics,
    SizeView,
  },
  data() {
    return {
      id: this.$route.params.id,
      listProduct: [],
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
  async created() {
    // eslint-disable-next-line no-console
    console.log(this.id, 'id')
    await this.$store.dispatch('product/getListProduct', this.id)
    this.listProduct = this.$store.state.product.listProduct
  },
  methods: {
    addToCart() {
      this.$axios.$post('/cart', this.listProduct).then((res) => {
        this.$store.dispatch('sideMenu/setSideMenuId', 'side-menu-cart')
        this.$store.dispatch('sideMenu/setStateSideMenu')
      })
    },

    setIdTab(data) {
      this.idTab = data
    },
  },
}
</script>

<style></style>
