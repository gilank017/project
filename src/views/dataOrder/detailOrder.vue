<template>
    <v-app>
      <v-card tile>
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
          <v-spacer></v-spacer>
              <v-btn
                text
                class="ma-2"
                color="blue darken-2"
                dark
              >
                <v-icon dark left> edit </v-icon> Edit</v-btn
              >
          <v-btn text class="ma-2" color="blue darken-2" dark>
            <v-icon dark left> mdi-bitbucket </v-icon> Archive
          </v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <v-card class="right mb-6 ml-6" max-width="500" v-if="detailProduct != null">
          <v-card-title>Basic Information</v-card-title>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title> <h4>Order Code:</h4></v-list-item-title>
              <v-list-item-subtitle>{{ detailProduct.order_code }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title><h4>Client Name:</h4></v-list-item-title>
              <v-list-item-subtitle>
                {{ detailProduct.client_name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title><h4>Type:</h4></v-list-item-title>
              <v-list-item-subtitle>
                  <span v-if="detailProduct.type == 1"
                  >Income</span
                >
                <span v-if="detailProduct.type == 2"
                  >Outcome</span
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card-title>Detail Orders</v-card-title>
        <v-simple-table>
            <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left" >Image Preview</th>
                        <th class="text-left">Product Name</th>
                        <th class="text-left">Price(Currency)</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(value, index) in detailProduct.items" :key="index">
                         <td>
                          <v-img
                            class="ma-2"
                            :src="value.image_url"
                            max-width="70"
                            max-height="70"
                          ></v-img>
                        </td>
                        <td>
                           {{value.product_title}} 
                        </td>
                        <td>
                            {{value.price}} {{detailProduct.currency}}
                        </td>
                        <td>
                            {{value.quantity}} 
                        </td>
                        <td>
                            {{value.total_price}} {{detailProduct.currency}}
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th class="text-left">Grand Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{{detailProduct.grand_total}} {{detailProduct.currency}}</th>
                      </tr>
                    </tfoot>
                  </template>
        </v-simple-table>
      </v-card>
    </v-app>
</template>


<script>
import Proxy from "@/services/proxy";
export default {
    data(){
        return{
            detailProduct:[],

        }
    },
    methods:{
        redirectOrder(){
            this.$router.push("/Menu/Order")
        },
    },

    mounted(){
         const uri = "https://api-dev.phantasmode.com";
    // get token from localStorage
    const token = localStorage.getItem("access_token");
    // set the headers
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    Proxy.get(
      uri + "/api/orders/" + this.$route.params.id,
      {
        headers,
      }
    ).then((res) => {
        this.detailProduct = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    }
}
</script>

<style scoped>
.tfoot {
 border-block-start-color: maroon;
}
</style>