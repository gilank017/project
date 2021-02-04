<template>
  <v-app>
    <template>
      <v-card tile>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="3">
                <v-card max-width="300px">
                  <v-row>
                    <v-col cols="6">
                      <v-icon class="pl-2" size="70" color="blue darken-2"
                        >store</v-icon
                      >
                    </v-col>
                    <v-col cols="6" class="display-3 font-weight-bold">
                      {{ dataMain.products }}
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-card-subtitle class="text-center"
                    >Total Product</v-card-subtitle
                  >
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card max-width="300px">
                  <v-row>
                    <v-col cols="6">
                      <v-icon class="pl-2" size="70" color="green darken-2"
                        >shopping_cart</v-icon
                      >
                    </v-col>
                    <v-col cols="6" class="display-3 font-weight-bold">
                      {{ dataMain.orders }}
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-card-subtitle class="text-center"
                    >Total Order</v-card-subtitle
                  >
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card max-width="300px">
                  <v-row>
                    <v-col cols="6">
                      <v-icon class="pl-2" size="70" color="blue darken-2"
                        >mdi-account</v-icon
                      >
                    </v-col>
                    <v-col cols="6" class="display-3 font-weight-bold">
                      {{ dataMain.customer }}
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-card-subtitle class="text-center"
                    >Total Customer</v-card-subtitle
                  >
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card max-width="300px">
                  <v-row>
                    <v-col cols="6">
                      <v-icon class="pl-2" size="70" color="purple darken-2"
                        >mdi-account-multiple</v-icon
                      >
                    </v-col>
                    <v-col cols="6" class="display-3 font-weight-bold">
                      {{ dataMain.suppliers }}
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-card-subtitle class="text-center"
                    >Total Supplier</v-card-subtitle
                  >
                </v-card>
              </v-col>
              <v-col cols="12">
                <incomeChart />
              </v-col>
              <v-col cols="12">
                <outcomeChart />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </template>
  </v-app>
</template>

<script>
import incomeChart from "@/views/chartData/incomeChart";
import outcomeChart from "@/views/chartData/outcomeChart";
import Proxy from "@/services/proxy";
export default {
  name: "Dashboard",
  components: { incomeChart, outcomeChart },
  data() {
    return {
      dataMain: [],
    };
  },

  mounted() {
    const uri = "https://api-dev.phantasmode.com";
    const token = localStorage.getItem("access_token");
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    Proxy.get(uri + "/api/dashboard/main", {
      headers,
    })
      .then((res) => {
        this.dataMain = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
