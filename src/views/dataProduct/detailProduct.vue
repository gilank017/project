<template>
  <v-app>
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
    <template>
      <v-card tile>
        <v-card-actions>
          <v-btn
            text
            class="ma-2"
            color="blue darken-2"
            dark
            @click="redirectList"
          >
            <v-icon dark left> mdi-arrow-left </v-icon> Back To Product List
          </v-btn>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                class="ma-2"
                color="blue darken-2"
                dark
                v-on="on"
                v-bind="attrs"
                @click="postValue(dataProduct)"
              >
                <v-icon dark left> mdi-account-edit </v-icon> Edit</v-btn
              >
            </template>
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
          <v-btn text class="ma-2" color="blue darken-2" dark>
            <v-icon dark left> mdi-bitbucket </v-icon> Archive
          </v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-card max-width="700">
                <v-card-title class="justify-center"
                  >Picture Preview</v-card-title
                >
                <v-list-item class="justify-center">
                  <v-img
                    class="pa-4 mb-6"
                    :src="dataProduct.image_url"
                    max-width="168"
                    max-height="168"
                  ></v-img>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card max-width="700">
                <v-card-title class="justify-center"
                  >Information Product</v-card-title
                >
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h4>Product Name:</h4></v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      dataProduct.product_name
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h4>Price(Currency):</h4></v-list-item-title
                    >
                    <v-list-item-subtitle>
                      {{ dataProduct.price }}({{
                        dataProduct.currency
                      }})</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title> <h4>Supplier:</h4></v-list-item-title>
                    <v-list-item-subtitle>{{
                      dataProduct.supplier_id
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card max-width="1200">
                <v-card-title>Description Product</v-card-title>
                <v-card-text>
                  <div>{{ dataProduct.description }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </v-app>
</template>

<script>
import Proxy from "@/services/proxy";
export default {
  data() {
    return {
      dialog: false,
      dataProduct: "",
      Product: {
        id: "",
        productName: "",
        image_url: "",
        price: "",
        currency: "",
        supplier_id: "",
        description: "",
      },
      supplierName: [],
      snackbarUpdate: {
        appears: false,
        message: "Product Updated Successfully",
        colour: "success",
      },
    };
  },
  methods: {
    redirectList() {
      this.$router.push("/Menu/Product");
    },

    postValue(dataProduct) {
      this.Product.productName = dataProduct.product_name;
      this.Product.image_url = dataProduct.image_url;
      this.Product.price = dataProduct.price;
      this.Product.currency = dataProduct.currency;
      this.Product.supplier_id = dataProduct.supplier_id;
      this.Product.description = dataProduct.description;
    },
    close() {
      this.dialog = false;
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
        uri + "/api/products/" + this.$route.params.id,
        body,
        {
          headers,
        }
      );
      console.log(response.data);
      this.snackbarUpdate.appears = true;
      this.close();
    },
  },
  async mounted() {
    // set url
    const uri = "https://api-dev.phantasmode.com";
    // get token from localStorage
    const token = localStorage.getItem("access_token");
    // set the headers
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    const result = await Proxy.get(
      uri + "/api/products/" + this.$route.params.id,
      {
        headers,
      }
    );
    console.log(result.data);
    this.dataProduct = result.data;

    this.loadingtype = true;
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
