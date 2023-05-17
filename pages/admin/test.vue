<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Id
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{
              idParams === 'products'
                ? 'Price'
                : idParams === 'orders'
                ? 'Ship email'
                : idParams === 'accounts'
                ? 'email'
                : idParams === 'category'
                ? ''
                : ''
            }}
          </th>
          <th
            v-show="isProductTab"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Image_src
          </th>
          <th
            v-show="isOrderTab"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Address
          </th>
          <th
            v-show="isOrderTab"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone number
          </th>
          <th
            v-show="isOrderTab"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Orders items
          </th>
          <th
            v-show="isOrderTab"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Orders time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in currentItems" :key="item.id">
          <td class="border-t px-6 py-4">
            {{
              idParams === 'orders'
                ? item.id
                : idParams === 'category'
                ? item.category_id
                : item.id
            }}
          </td>
          <td class="border-t px-6 py-4">
            {{ idParams === 'orders' ? item.form.name : item.name }}
          </td>
          <td class="border-t px-6 py-4">
            {{
              idParams === 'products'
                ? item.price
                : idParams === 'orders'
                ? item.form.email
                : idParams === 'accounts'
                ? item.email
                : idParams === 'category'
                ? ''
                : ''
            }}
          </td>
          <td class="border-t px-6 py-4">
            {{ idParams === 'orders' ? item.form.address : '' }}
          </td>
          <td class="border-t px-6 py-4">
            {{ idParams === 'orders' ? item.form.phone : '' }}
          </td>
          <td v-show="isOrderTab" class="border-t px-6 py-4">
            Items id list
            <tr>
              <th class="border border-gray-400">Id</th>
              <td
                v-for="orderItem in item.ordersItems"
                :key="orderItem.id"
                class="border border-gray-400 px-3"
              >
                {{ orderItem.id }}
              </td>
            </tr>
            <tr>
              <th class="border border-gray-400">Quantity</th>
              <td
                v-for="orderItem in item.ordersItems"
                :key="orderItem.id"
                class="border border-gray-400 px-3"
              >
                {{ orderItem.quantity }}
              </td>
            </tr>
          </td>
          <td class="border-t px-6 py-4">
            {{ idParams === 'orders' ? item.form.order_date : '' }}
          </td>
          <td class="border-t px-6 py-4">
            <img
              v-show="isProductTab"
              class="w-20 h-20"
              :src="item.image_src"
              alt=""
            />
          </td>
        </tr>
      </tbody>
    </table>

    <v-pagination
      v-model="currentPage"
      color="#FFDD00"
      class="py-8"
      :length="totalPages"
      :total-visible="7"
      :prev-icon="$vuetify.icons.prevPage"
      :next-icon="$vuetify.icons.nextPage"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  layout: 'admin',
  data() {
    return {
      currentPage: 1,
      pageSize: 5, // số bản ghi tối đa cho mỗi trang,
      idParams: this.$route.params.id,
    }
  },
  computed: {
    ...mapState('admin', {
      itemsFilter: (state) => state.itemsFilter,
    }),

    currentItems() {
      if (this.itemsFilter) {
        return this.itemsFilter.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        )
      }
      return []
    },
    //
    totalPages() {
      if (this.itemsFilter && this.itemsFilter.length) {
        return Math.ceil(this.itemsFilter.length / this.pageSize)
      }
      return 0
    },

    isProductTab() {
      return this.idParams === 'products'
    },

    isOrderTab() {
      return this.idParams === 'orders'
    },
  },

  created() {
    this.getListFilter(this.$route.params.id).then((res) => {
      // eslint-disable-next-line no-console
      console.log(this.itemsFilter, 'itemsFilter')
    })
  },

  methods: {
    ...mapActions('admin', {
      getListFilter: 'getListFilter',
    }),
  },
}
</script>

<style></style>
