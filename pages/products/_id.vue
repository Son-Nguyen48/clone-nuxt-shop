<template>
  <div class="px-6 md:pt-[105px]">
    <div class="flex flex-col gap-6 md:flex-row lg:p-20 md:h-[800px] py-20">
      <div class="md:w-1/2 flex justify-center items-center">
        <img
          class="shadow-[0_2px_12px_0_rgba(0,0,0,0.8)] rounded"
          :src="productItem.image_src"
          alt="product"
        />
      </div>
      <div class="md:w-1/2 text-center flex flex-col gap-4">
        <h4 class="font-bold text-2xl">{{ productItem.name }}</h4>
        <currency-formatter :amount="productItem.price" />
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
      </div>
    </div>

    <div class="text-center">
      <h2 class="text-[28px] leading-[1.6] font-medium hover:text-[#fcda00]">
        <p class="uppercase font-bold">Similar product</p>
      </h2>
    </div>

    <div
      class="mt-9 grid grid-cols-2 gap-y-10 md:gap-x-4 md:gap-y-20 md:grid-cols-5"
    >
      <card-item
        v-for="product in similarProduct"
        :key="product.id"
        :product="product"
      ></card-item>
    </div>

    <hr class="py-5" />

    <div class="h-[100px] text-center">
      <nuxt-link
        :to="`/collections/${productItem.brand}`"
        class="inline-block font-bold text-black bg-white hover:bg-[#FFDD00] hover:transform hover:-translate-y-2 hover:scale-105 transition-all ease-linear duration-300 rounded-lg"
      >
        <base-button :title="'SIMILAR PRODUCT'"></base-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import IntroduceView from '~/components/The-feature/The-tabs/IntroduceView.vue'
import ProductCharacteristics from '~/components/The-feature/The-tabs/ProductCharacteristics.vue'
import SizeView from '~/components/The-feature/The-tabs/SizeView.vue'
import BaseButton from '~/components/UI/Button/BaseButton.vue'
import TabsView from '~/components/UI/TabsView.vue'
import CardItem from '~/components/UI/CardItem.vue'
import CurrencyFormatter from '~/components/UI/CurrencyFormatter.vue'

export default {
  components: {
    BaseButton,
    TabsView,
    IntroduceView,
    ProductCharacteristics,
    SizeView,
    CardItem,
    CurrencyFormatter,
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
      productFilter: 'product/productFilter',
    }),
    similarProduct() {
      return this.productFilter.slice(0, 5)
    },
  },
  async created() {
    // eslint-disable-next-line no-console
    console.log(this.id, 'id')
    await this.$store.dispatch('product/getProduct', this.id)
    // eslint-disable-next-line no-console
    console.log(this.$store.state.product.productItem, 'productItem')
    await this.getListFilter({ name: 'brand', data: this.productItem.brand })
  },
  methods: {
    async addToCart(product) {
      await this.$swal
        .fire({
          title: 'Are you sure?',
          text: 'Do you want to add this item to cart?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, add it!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            let data = { product }
            console.log(data, 'data')
            const addedItem = this.$store.state.cart.cartItems.find(
              (i) => i.product?.id === product.id
            )
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            if (addedItem)
              data = {
                ...data,
                userId: currentUser.id,
                quantity: addedItem.quantity + 1,
              }
            else
              data = {
                ...data,
                userId: currentUser.id,
                quantity: 1,
              }

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

            this.$swal.fire('Great!', 'Your item has been added.', 'success')
          }
        })
    },

    setIdTab(data) {
      this.idTab = data
    },

    ...mapActions({
      getListFilter: 'product/getListFilter',
    }),
  },
}
</script>

<style scoped>
.v-application ul {
  padding-left: 0;
}
</style>
