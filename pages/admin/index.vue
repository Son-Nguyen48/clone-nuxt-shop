<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="calories"
      class="elevation-1"
    >
      <template #[`item.image_src`]="{ item }">
        <img class="max-w-[120px]" :src="item.image_src" alt="image" />
      </template>

      <template #[`item.actions`]="{ item }">
        <font-awesome-icon
          role="button"
          :icon="['fas', 'pen-to-square']"
          size="lg"
          style="color: #000000"
          @click="editItem(item)"
        />
        <font-awesome-icon
          role="button"
          :icon="['fas', 'trash']"
          size="lg"
          style="color: #000000"
          @click="deleteItem(item)"
        />
      </template>
    </v-data-table>

    <v-dialog v-model="isShowModal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Product Edit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="id" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="brand"
                  hint="Edit your brand name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="gender"
                  hint="Edit product gender"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  required
                  hint="Edit product name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="image_src"
                  required
                  hint="Edit product image_src"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="category"
                  :items="[
                    'lazy_shoes',
                    'sneaker_shoes',
                    'unisex_shoes',
                    'children_shoes',
                    'flat_shoes',
                  ]"
                  required
                  hint="Edit product category"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isShowModal = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="isShowModal = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isDeleteFormShow" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Do you really want to delete this product?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="isDeleteFormShow = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="agreeDelete(item)">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'admin',
  data() {
    return {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Id', value: 'id' },
        { text: 'Brand', value: 'brand_id' },
        { text: 'Gender', value: 'gender' },
        { text: 'Name', value: 'name' },
        { text: 'Image', value: 'image_src' },
        { text: 'Category', value: 'category_id' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [
        {
          brand_id: 3,
          newArrival: null,
          gender: 'unisex',
          category_id: 'lazy_shoes',
          sale: 20,
          name: ' Giày Lười Unisex NATIVE Miles ',
          image_src:
            'http://product.hstatic.net/1000376021/product/11104600-1999-1_dde3bbe180c1406392336f4a6cb7af70_a391a2d67e3343f282e5ef382d2e86ba_large.jpg',
          price: '1400000',
          id: 1,
          quantity: 100,
        },
        {
          brand_id: 15,
          newArrival: true,
          gender: 'woman',
          category_id: 'flat_shoes',
          sale: 20,
          name: ' Giày Đế Xuồng Nữ CARMELA Camel Leather Ladies Sandals ',
          image_src:
            'https://product.hstatic.net/1000376021/product/160835_camel_0_10557bad46b54b90ac98ef8c25ed027f_827d1d2c6a7c4373ae2b0461e708fedc_large.jpg',
          price: '2490000',
          id: 2,
          quantity: 100,
        },
      ],
      id: '',
      brand: '',
      gender: '',
      name: '',
      image_src: '',
      category: '',
      isShowModal: false,
      isDeleteFormShow: false,
    }
  },

  computed: {
    ...mapGetters({
      getState: 'indexAdmin/getState',
    }),
  },

  created() {
    this.getItems('products')
    // eslint-disable-next-line no-console
    console.log(this.getState, 'getState')
  },

  methods: {
    ...mapActions({
      getItems: 'indexAdmin/getItems',
    }),

    editItem(item) {
      this.isShowModal = true
      this.id = item.id
      this.brand = item.brand
      this.gender = item.gender
      this.name = item.name
      this.image_src = item.image_src
      this.category = item.category_id
    },

    deleteItem(item) {
      this.isDeleteFormShow = true
    },

    agreeDelete(item) {
      const indexSelected = this.items.indexOf(item)
      this.items.slice(indexSelected, 1)
    },
  },
}
</script>
