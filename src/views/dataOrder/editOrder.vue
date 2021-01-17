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
    <v-card>
      <v-card-actions>
        <v-btn
          text
          class="ma-2"
          color="blue darken-2"
          dark
          @click="redirectOrder"
        >
          <v-icon dark left> mdi-arrow-left </v-icon> Back To Order List
        </v-btn>
      </v-card-actions>
      <v-col cols="12">
        <v-card-title>Customer</v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-select
                  label="Type"
                  v-model="inputData.type"
                  :items="typeOrder"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="4"></v-col>
              <v-col cols="5" md="3">
                <v-select
                  label="Currency"
                  v-model="inputData.currency"
                  :items="currencyList"
                  @change="changeCurrency"
                ></v-select>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  label="Customer Name"
                  v-model="inputData.name_client"
                  :items="dataCustomer"
                  item-text="name"
                  item-value="name"
                >
                </v-text-field>
              </v-col>
              <v-col cols="2"></v-col>
              <v-col cols="5" md="3">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      label="Order Date"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :value="inputData.date"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="inputData.date" landscape>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-select
                  label="Status"
                  v-model="inputData.status"
                  :items="statusList"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-card-title>Create Orders</v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-list-title><h3>Detail Product</h3></v-list-title>
              </v-col>
              <v-col cols="4">
                <v-dialog v-model="dialog" max-width="700px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="ma-2" color="primary" v-on="on" v-bind="attrs"
                      ><v-icon>mdi-plus</v-icon>Add Product</v-btn
                    >
                  </template>
                  <v-card tile>
                    <v-card-title>
                      <span class="headline">Add Product</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form>
                          <v-row>
                            <v-col cols="12" md="8">
                              <v-autocomplete
                                v-model="selectProduct"
                                label="Search Product"
                                :items="dataProduct"
                                :search-input.sync="searchInput"
                                item-text="product_name"
                                item-value="product_name"
                                return-object
                              >
                                <v-btn
                                  small
                                  slot="append-outer"
                                  @click="addProduct"
                                  color="primary"
                                >
                                  Add Product
                                </v-btn>
                                <template v-slot:item="data">
                                  <template
                                    v-if="typeof data.item !== 'object'"
                                  >
                                    <v-list-item-content
                                      v-text="data.item"
                                    ></v-list-item-content>
                                  </template>
                                  <template v-else>
                                    <v-list-item-image>
                                      <v-img
                                        class="ma-2 pa-2"
                                        :src="data.item.image_url"
                                        max-width="40"
                                        max-height="40"
                                      >
                                      </v-img>
                                    </v-list-item-image>
                                    <v-list-item-content>
                                      <v-list-item-title>{{
                                        data.item.product_name
                                      }}</v-list-item-title>
                                      <v-list-item-sub-title
                                        >{{ data.item.price }}
                                        {{
                                          data.item.currency
                                        }}</v-list-item-sub-title
                                      >
                                    </v-list-item-content>
                                  </template>
                                </template>
                              </v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                              <v-list>
                                <v-list-title
                                  ><h3>Selected Product</h3></v-list-title
                                >
                                <v-list-item
                                  v-for="(value, index) in valueProduct"
                                  :key="index"
                                >
                                  <v-list-item-image>
                                    <v-img
                                      class="ma-2 pa-2"
                                      :src="value.image_url"
                                      max-width="40"
                                      max-height="40"
                                    >
                                    </v-img>
                                  </v-list-item-image>
                                  <v-list-item-title
                                    >Product:
                                    {{ value.product_name }}
                                    {{ value.product_title }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    Price : {{ value.price }}
                                    {{ value.currency }}
                                  </v-list-item-subtitle>
                                  <v-list-item-action>
                                    <v-icon
                                      slot="append"
                                      color="red"
                                      @click="removeProduct"
                                    >
                                      mdi-minus-circle-outline
                                    </v-icon>
                                  </v-list-item-action>
                                </v-list-item>
                              </v-list>
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
                <v-dialog v-model="dialogNote" max-width="600px" scrollable>
                  <v-card tile>
                    <v-card-title>
                      <span class="headline">Add Note</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form>
                          <v-row>
                            <v-textarea
                              v-model="noteProduct"
                              placeholder="Add Some Note. . ."
                            ></v-textarea>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-divider class="mt-5"></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" @click="close"> Cancel </v-btn>
                      <v-btn color="primary" @click="saveNote"> Save </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">image</th>
                        <th class="text-left">Product Name</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Total</th>
                        <th class="text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(value, index) in detailProduct" :key="index">
                        <td>
                          <v-img
                            class="ma-2 pa-2"
                            :src="value.image_url"
                            max-width="70"
                            max-height="70"
                          ></v-img>
                        </td>
                        <td>
                          <v-list>
                            <v-list-item-title>
                              <h3>
                                {{ value.product_title }}
                                {{ value.product_name }}
                              </h3>
                              <caption v-if="value.supplier_name != null">
                                By
                                {{
                                  value.supplier_name
                                }}
                              </caption>
                            </v-list-item-title>
                            <v-list-item-subtitle v-if="value.note != null">
                              Note : {{ value.note }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                              <v-btn
                                text
                                x-small
                                @click="openNote"
                                color="primary"
                                >Add Note</v-btn
                              >
                            </v-list-item-subtitle>
                          </v-list>
                        </td>
                        <td>{{ value.price }}</td>
                        <td>
                          <v-text-field
                            v-model="value.quantity"
                            class="editWidth"
                            type="number"
                            @change="calculateTotal(index)"
                          ></v-text-field>
                        </td>

                        <td>{{ value.total_price }}</td>
                        <td>
                          <v-icon
                            v-model="removeData"
                            @click="removeDetailProduct(index)"
                            >clear</v-icon
                          >
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
      <v-divider class="mt-5"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancelData"> Cancel </v-btn>
        <v-btn color="primary" @click="saveData(index)"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import Proxy from "@/services/proxy";
export default {
  name: "editOrder",
  data() {
    return {
      date: "",
      menu: false,
      dialog: false,
      dialogNote: false,
      removeData: "",
      dataCustomer: [],
      typeOrder: [
        { id: 1, name: "Income" },
        { id: 2, name: "Outcome" },
      ],
      inputData: {
        name_client: "",
        type: "",
        currency: "",
        date: "",
        status: "",
      },
      snackbar: {
        show: false,
        text: "Data Added Successfully",
        color: "success",
      },
      currencyList: ["USD", "IDR", "CNY"],
      statusList: [
        { id: 1, name: "Pending" },
        { id: 2, name: "Delivered" },
      ],
      detailProduct: [],
      detailProductList: [],
      noteProduct: "",
      selectProduct: {},
      queryTerm: "",
      valueProduct: [],
      activeProduct: "",
      productIndex: "",
      quantity: "",
      totalProduct: 0,
    };
  },
  watch: {
    search: {
      get() {
        this.queryTerm;
      },
      set(searchInput) {
        if (this.queryTerm !== searchInput) {
          this.queryTerm = searchInput;
          this.loadProduct();
        }
      },
    },
  },
  created() {
    this.loadProduct();
    this.save();
  },

  methods: {
    changeCurrency() {
      this.loadProduct();
    },

    redirectOrder() {
      this.$router.push("/Menu/Order");
    },

    loadProduct() {
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };

      Proxy.get(
        uri +
          "/api/products/" +
          "?product_name=" +
          (this.queryTerm || "") +
          "&convertTo=" +
          this.inputData.currency,
        { headers }
      )
        .then((res) => {
          this.dataProduct = res.data.data;
          this.queryTerm = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addProduct() {
      const incomingDataProduct = this.selectProduct;
      this.selectProduct = {};
      this.valueProduct.push(incomingDataProduct);
    },
    close() {
      this.dialog = false;
      this.dialogNote = false;
      this.selectProduct = null;
    },
    save() {
      for (let i in this.valueProduct) {
        this.detailProduct.push({
          id: this.valueProduct[i].id,
          image_url: this.valueProduct[i].image_url,
          product_title: this.valueProduct[i].product_name,
          supplier_name: this.valueProduct[i].supplier_name,
          price: this.valueProduct[i].price,
          currency: this.valueProduct[i].currency,
          total_price: 0,
        });
      }
      this.detailProductList = this.valueProduct;
      this.close();
    },
    removeProduct(index) {
      this.valueProduct.splice(index, 1);
    },
    removeDetailProduct(index) {
      this.productIndex = index;
      this.detailProduct.splice(index, 1);
      this.detailProductList[this.productIndex].remove = true;
      console.log(this.productIndex);
    },
    openNote(indexProduct) {
      this.dialogNote = true;
      this.activeProduct = indexProduct;
    },
    saveNote() {
      this.detailProduct[this.activeProduct].note = this.noteProduct;
      this.dialogNote = false;
    },
    calculateTotal(index) {
      this.activeProduct = index;
      const total =
        this.detailProduct[this.activeProduct].price *
        this.detailProduct[this.activeProduct].quantity;
      if (!isNaN(total)) {
        this.detailProduct[this.activeProduct].total_price = total;
      }
    },
    cancelData() {
      this.$router.push("/Menu/Order/");
    },
    saveData() {
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const body = {
        type: this.inputData.type,
        client_name: this.inputData.name_client,
        currency: this.inputData.currency,
        order_date: this.inputData.date,
        status: this.inputData.status,
        items: this.detailProductList,
      };

      Proxy.put(uri + "/api/orders/" + this.$route.params.order_id, body, {
        headers,
      })
        .then((res) => {
          console.log(res);
          this.snackbar.show = true;
          this.$router.push("/Menu/Order");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(body);
    },
  },
  mounted() {
    const uri = "https://api-dev.phantasmode.com";
    // get token from localStorage
    const token = localStorage.getItem("access_token");
    // set the headers
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    Proxy.get(uri + "/api/contacts" + "?type=1", { headers })
      .then((res) => {
        this.dataCustomer = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    Proxy.get(uri + "/api/orders/" + this.$route.params.order_id, { headers })
      .then((res) => {
        this.inputData.name_client = res.data.client_name;
        this.inputData.type = res.data.type;
        this.inputData.currency = res.data.currency;
        this.inputData.date = res.data.order_date;
        this.inputData.status = res.data.status;
        this.valueProduct = res.data.items;
        this.detailProduct = res.data.items;
      })
      .catch((err) => {
        console.log(err);
      });

    Proxy.get(uri + "/api/orders/" + this.$route.params.order_id, { headers })
      .then((response) => {
        this.detailProductList = response.data.items;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.editWidth {
  width: 50px;
}
</style>
