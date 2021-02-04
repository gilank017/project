<template>
  <v-app>
    <v-data-table
      :loading="loadingOrder"
      :headers="headers"
      :items="listOrder"
      item-key="id"
      :page="pageOrder"
      :options.sync="optionsOrder"
      :server-items-length="totalOrder"
      @update:options="paginate"
      show-select
      class="elevation-1"
      loading-text="Loading . . . Please Wait"
    >
      <template v-slot:top flat>
        <v-toolbar class="elevation-1">
          <v-btn class="ma-2" color="primary" @click="create"
            ><v-icon>mdi-cart-plus</v-icon>Create Order</v-btn
          >
        </v-toolbar>
      </template>

      <template v-slot:[`item.type`]="items">
        <div class="justify-center" v-for="(type, index) in items" :key="index">
          <v-chip small color="primary" v-if="type == 1">income</v-chip>
          <v-chip small v-if="type == 2">outcome</v-chip>
        </div>
      </template>

      <template v-slot:[`item.total_currency`]="{ item }"
        >{{ item.grand_total }} ({{ item.currency }})
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
                <v-icon small>mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Edit Order</v-list-item-title>
            </v-list-item>
            <v-list-item @click="Delete(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-cart-off</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Delete Order</v-list-item-title>
            </v-list-item>
            <v-list-item @click="Detail(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>info</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Detail Order</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import Proxy from "@/services/proxy";
export default {
  name: "listOrder",
  data() {
    return {
      loadingOrder: false,
      headers: [
        {
          text: "Order Code",
          align: "start",
          sortable: false,
          value: "order_code",
        },
        { text: "Type", value: "type" },
        { text: "Total(Currency)", value: "total_currency" },
        { text: "Client Name", value: "client_name" },
        { text: "Order Date", value: "order_date" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      listOrder: [],
      pageOrder: 1,
      totalOrder: 0,
      optionsOrder: {},
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
    paginate() {
      this.readDataFromAPI();
    },
    create() {
      this.$router.push("/Menu/Order/createOrder");
    },
    Detail(id) {
      console.log(id);
      this.$router.push("/Menu/Order/detailOrder/" + id);
    },
    Edit(id) {
      console.log(id);
      this.$router.push("/Menu/Order/editOrder/" + id);
    },
    readDataFromAPI() {
      this.loadingOrder = true;
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const { page, itemsPerPage } = this.optionsOrder;
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(
        uri + "/api/orders" + "?page=" + page + "&limit=" + itemsPerPage,
        { headers }
      )
        .then((res) => {
          this.listOrder = res.data.data;
          this.totalOrder = res.data.total;
          this.loadingOrder = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingOrder = false;
        });
    },
  },

  mounted() {
    this.readDataFromAPI();
  },
};
</script>
