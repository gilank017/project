<template>
  <v-app>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      top
      centered
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbarUpdate.appears"
      :timeout="3000"
      top
      centered
      :color="snackbarUpdate.colour"
    >
      {{ snackbarUpdate.message }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbarUpdate.appears = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbarDelete.appears"
      :timeout="3000"
      top
      centered
      :color="snackbarDelete.colour"
    >
      {{ snackbarDelete.message }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbarDelete.appears = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-data-table
      :loading="loadingProduct"
      :headers="headers"
      :items="product"
      :page="pageProduct"
      :options.sync="optionsProduct"
      :server-items-length="totalProduct"
      show-select
      item-key="id"
      class="elevation-1"
      loading-text="Loading ... Please Wait"
      @update:options="paginate"
    >
      <template v-slot:top flat>
        <v-toolbar class="elevation-1">
          <addProduct @productAdded="snackbar.show = true" />
          <v-dialog v-model="dialogEdit" max-width="700px">
            <v-card tile>
              <v-card-title>
                <span class="headline">Edit Product</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="Product.productName"
                          label="Product Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="Product.price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="Product.currency"
                          label="Currency"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-autocomplete
                          v-model="Product.supplier_id"
                          label="Type"
                          :loading="loadingtype"
                          :items="supplierName"
                          item-text="name"
                          item-value="id"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="6"></v-col>
                      <v-col cols="12">
                        <vue-editor
                          v-model="Product.description"
                          placeholder="Description"
                        >
                        </vue-editor>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="Product.image_url"
                          label="Image Url"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="6"
                        class="d-flex flex-column justify-space-between align-center"
                      >
                        <v-img
                          :src="Product.image_url"
                          max-height="150"
                          max-width="150"
                        ></v-img>
                        <v-text-title>Image Preview</v-text-title>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-divider class="mt-5"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="close"> Cancel </v-btn>
                <v-btn color="primary" @click="update"> Update </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="justify-center"
                >Delete This Product?</v-card-title
              >
              <v-spacer></v-spacer>
              <v-card-subtitle class="text-center"
                >Are you sure?</v-card-subtitle
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Yes</v-btn
                >
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >No</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.image`]="{ item }">
        <v-img
          class="pa-2 ma-2"
          :src="item.image_url"
          max-width="50"
          max-height="50"
        ></v-img>
      </template>

      <template v-slot:[`item.price_currency`]="{ item }"
        >{{ item.price }} ({{ item.currency }})
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu>
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...menu, ...tooltip }">
                  <v-icon>mdi-dots-vertical</v-icon></v-btn
                >
              </template>
              <span>Action</span>
            </v-tooltip>
          </template>
          <v-list class="pa-0" dense>
            <v-list-item @click="Edit(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>edit</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Edit Product</v-list-item-title>
            </v-list-item>
            <v-list-item @click="Delete(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>clear</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Delete Product</v-list-item-title>
            </v-list-item>
            <v-list-item @click="Detail(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>info</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Detail Product</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import Proxy from "@/services/proxy";
import addProduct from "./addProduct";
import { VueEditor } from "vue2-editor";
export default {
  name: "Product",
  components: { addProduct, VueEditor },
  data() {
    return {
      loadingtype: false,
      loadingProduct: false,
      dialogEdit: false,
      dialogDelete: false,
      headers: [
        {
          text: "Image",
          align: "start",
          sortable: false,
          value: "image",
        },
        { text: "Product Name", value: "product_name" },
        { text: "Price(Currency)", value: "price_currency" },
        { text: "Data Added", value: "created_at" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      Product: {
        id: "",
        productName: "",
        image_url: "",
        price: "",
        currency: "",
        supplier_id: "",
        description: "",
      },
      clearProduct: {
        id: "",
        productName: "",
        image_url: "",
        price: "",
        currency: "",
        supplier_id: "",
        description: "",
      },
      product: [],
      supplierName: [],
      snackbar: {
        show: false,
        text: "Product Added Successfully",
        color: "success",
      },
      snackbarUpdate: {
        appears: false,
        message: "Product Updated Successfully",
        colour: "success",
      },
      snackbarDelete: {
        appears: false,
        message: "Product Deleted Successfully",
        colour: "success",
      },
      pageProduct: 1,
      totalProduct: 0,
      optionsProduct: {},
      productId: 0,
    };
  },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    deep: true,
  },
  methods: {
    close() {
      this.dialogEdit = false;
      this.Product = this.clearProduct;
    },

    paginate() {
      this.readDataFromAPI();
    },
    readDataFromAPI() {
      this.loadingProduct = true;
      // set url
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const { page, itemsPerPage, sortBy, sortDesc } = this.optionsProduct;
      if (sortBy.length === 1 && sortDesc.length === 1) {
        this.product = this.product.sort((a, b) => {
          const sortA = a[sortBy[0]];
          const sortB = b[sortBy[0]];

          if (sortDesc[0]) {
            if (sortA < sortB) return 1;
            if (sortA > sortB) return -1;
            return 0;
          } else {
            if (sortA < sortB) return -1;
            if (sortA > sortB) return 1;
            return 0;
          }
        });
      }
      console.log(sortBy, sortDesc);
      Proxy.get(
        uri +
          "/api/products" +
          "?page=" +
          page +
          "&limit=" +
          itemsPerPage +
          "&sortBy=" +
          (sortBy.length == 1 ? sortBy[0] : "created_at") +
          "&sortDirection=" +
          (sortDesc.length == 1 ? (sortDesc[0] ? "desc" : "asc") : "desc"),
        {
          headers,
        }
      )
        .then((res) => {
          this.totalProduct = res.data.total;
          this.product = res.data.data;
          this.loadingProduct = false;
          this.readDataFromAPI();
        })
        .catch((err) => {
          console.log(err);
          this.loadingProduct = false;
        });
    },
    Edit(id) {
      console.log(id);
      this.dialogEdit = true;
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(uri + "/api/products/" + id, {
        headers,
      })
        .then((res) => {
          this.Product.id = res.data.id;
          this.Product.productName = res.data.product_name;
          this.Product.image_url = res.data.image_url;
          this.Product.price = res.data.price;
          this.Product.currency = res.data.currency;
          this.Product.supplier_id = res.data.supplier_id;
          this.Product.description = res.data.description;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    Delete(id) {
      console.log(id);
      this.productId = id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const result = Proxy.delete(uri + "/api/products/" + this.productId, {
        headers,
      });
      console.log(result.data);
      this.snackbarDelete.appears = true;
      this.readDataFromAPI();
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    update() {
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const body = {
        product_name: this.Product.productName,
        image_url: this.Product.image_url,
        price: this.Product.price,
        currency: this.Product.currency,
        supplier_id: this.Product.supplier_id,
        description: this.Product.description,
      };
      const response = Proxy.put(
        uri + "/api/products/" + this.Product.id,
        body,
        {
          headers,
        }
      );
      console.log(response);
      this.readDataFromAPI();
      this.snackbarUpdate.appears = true;
      this.close();
    },

    Detail(id) {
      console.log(id);
      this.$router.push("/Menu/Product/detailProduct/" + id);
    },

    dataSupplier() {
      this.loadingtype = true;
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(uri + "/api/contacts" + "?type=2", { headers })
        .then((res) => {
          this.supplierName = res.data.data;
          this.loadingtype = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingtype = false;
        });
    },
  },

  mounted() {
    this.readDataFromAPI();
  },
};
</script>
