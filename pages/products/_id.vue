<template>
  <div class="md:pt-[105px]">
    <div class="flex flex-col gap-6 md:flex-row md:p-20 md:h-[800px] py-20">
      <div class="md:w-1/2 flex justify-center items-center">
        <img
          class="shadow-[0_2px_12px_0_rgba(0,0,0,0.8)] rounded"
          :src="productItem.image_src"
          alt="product"
        />
      </div>
      <div class="md:w-1/2 text-center flex flex-col gap-4">
        <h4 class="font-bold text-2xl">{{ productItem.name }}</h4>
        <p>{{ productItem.price }}</p>
        <div @click="addToCart(productItem)">
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      productItem: 'product/productItem',
    }),
  },
  async created() {
    // eslint-disable-next-line no-console
    console.log(this.id, 'id')
    await this.$store.dispatch('product/getProduct', this.id)
    // eslint-disable-next-line no-console
    console.log(this.$store.state.product.productItem, 'productItem')
  },
  methods: {
    addToCart(product) {
      let data = { product }
      const addedItem = this.$store.state.cart.cartItems.find(
        (i) => i.product?.id === product.id
      )
      if (addedItem) data = { ...data, quantity: addedItem.quantity + 1 }
      else data = { ...data, quantity: 1 }

      // eslint-disable-next-line no-console
      const methods = addedItem
        ? this.$axios.$put(`/cart/${addedItem.id}`, data)
        : this.$axios.$post(`/cart`, data)
      methods.then((res) => {
        this.$store.commit('cart/addToCart', res)
        this.$store.dispatch('sideMenu/setSideMenuId', 'side-menu-cart')
        if (!this.$store.state.sideMenu.isSideMenuOpen)
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
