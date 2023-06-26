<template>
  <div class="h-screen flex-1 overflow-y-scroll">
    <v-data-table
      :headers="theHeader"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text class="flex flex-wrap gap-2">
                <v-text-field
                  v-for="key in keyListItem"
                  :key="key"
                  v-model="editedItem[key]"
                  :label="`${key}`"
                  class="max-w-[100px]"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save($route.params.idAdmin)"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm($route.params.idAdmin)"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template #[`item.image_src`]="{ item }">
        <img class="max-w-[120px]" :src="item.image_src" alt="image" />
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Id', value: 'id' },
      { text: 'Brand', value: 'brand' },
      { text: 'Gender', value: 'gender' },
      { text: 'Image', value: 'image_src' },
      { text: 'Price', value: 'price' },
      { text: 'Quantity (g)', value: 'quantity' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      brand: '',
      gender: '',
      image_src: '',
      price: 0,
      newArrival: null,
      category_id: '',
      quantity: 0,
    },
    defaultItem: {
      id: 0,
      name: '',
      brand: '',
      gender: '',
      image_src: '',
      price: 0,
      newArrival: null,
      category_id: '',
      quantity: 0,
    },
    keyListItem: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    // Config row title of table data
    theHeader() {
      if (this.$route.params.idAdmin === 'products') {
        return [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Id', value: 'id' },
          { text: 'Brand', value: 'brand' },
          { text: 'Gender', value: 'gender' },
          { text: 'Image', value: 'image_src' },
          { text: 'Price', value: 'price' },
          { text: 'Quantity (g)', value: 'quantity' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      } else if (this.$route.params.idAdmin === 'orders') {
        return [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Id', value: 'id' },
          { text: 'User Id', value: 'userId' },
          { text: 'Address', value: 'address' },
          { text: 'Payment Methods', value: 'paymentsMethods' },
          { text: 'Order status', value: 'orderStatus' },
          { text: 'Order date', value: 'order_date' },
          { text: 'Total Payment (đ)', value: 'totalPayment' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      } else if (this.$route.params.idAdmin === 'accounts') {
        return [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Id', value: 'id' },
          { text: 'Phone', value: 'phone' },
          { text: 'Email', value: 'email' },
          { text: 'Address', value: 'address' },
          { text: 'Nationality', value: 'nationality' },
          { text: 'Company', value: 'company' },
          { text: 'Password', value: 'password' },
          { text: 'Date of birth', value: 'dateOfBirth' },
          { text: 'Gender', value: 'gender' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      } else if (this.$route.params.idAdmin === 'cart') {
        return [
          {
            text: 'userId',
            align: 'start',
            sortable: false,
            value: 'userId',
          },
          { text: 'Id', value: 'id' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      } else {
        return [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Id', value: 'category_id' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      }
    },

    formEdit() {
      return Object.keys(this.editedItem)
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
    console.log(this.formEdit, 'formEdit')
    this.keyListItem = this.theHeader.map((item) => {
      return item.value
    })
  },

  methods: {
    async initialize() {
      this.desserts = await this.$axios.$get(`/${this.$route.params.idAdmin}`)
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.keyListItem = Object.keys(item)
      if (this.keyListItem.includes('cartItems'))
        this.keyListItem.splice(this.keyListItem.indexOf('cartItems'), 1)
      if (this.keyListItem.includes('product'))
        this.keyListItem.splice(this.keyListItem.indexOf('product'), 1)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm(id) {
      await this.$axios.$delete(`/${id}/${this.editedItem.id}`)
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save(id) {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        const idSelected = this.desserts[this.editedIndex].id
        await this.$axios.$put(`/${id}/${idSelected}`, this.editedItem)
      } else {
        await this.$axios.$post(`/${id}`, this.editedItem)
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>
.v-input {
  max-width: 200px;
}
</style>
