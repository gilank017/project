<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" color="primary" v-on="on" v-bind="attrs"
        ><v-icon>mdi-plus</v-icon>New Product</v-btn
      >
    </template>
    <v-card tile>
      <v-card-title>
        <span class="headline">Add New Product</span>
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
                  label="Supplier Type"
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
        <v-btn color="primary" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Proxy from "@/services/proxy";
import { VueEditor } from "vue2-editor";
export default {
  name: "addProduct",
  components: { VueEditor },
  data: () => ({
    loadingtype: false,
    dialog: false,
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
    supplierName: [],
  }),
  methods: {
    close() {
      this.dialog = false;
      this.Product = this.clearProduct;
    },

    save() {
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const body = {
        product_name: this.Product.productName,
        price: this.Product.price,
        currency: this.Product.currency,
        supplier_id: this.Product.supplier_id,
        image_url: this.Product.image_url,
        description: this.Product.description,
      };
      Proxy.post(uri + "/api/products", body, { headers })
        .then((res) => {
          console.log(res);
          this.$emit("productAdded");
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
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
};
</script>
