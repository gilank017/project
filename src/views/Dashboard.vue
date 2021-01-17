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
                <v-card>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="9">
                        <v-card-title>Income Chart</v-card-title>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="selectIncome"
                          :items="selectValueIncome"
                          item-text="textDate"
                          item-value="valueDate"
                          @change="changeIncome"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12">
                        <line-chart
                          :data="dataIncome"
                          xtitle="Date"
                          ytitle="Income"
                          :curve="false"
                          prefix="$"
                          :download="true"
                        ></line-chart>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-container fluid>
                    <v-row align="center">
                      <v-col cols="9">
                        <v-card-title>Outcome Chart</v-card-title>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="selectOutcome"
                          :items="selectValueOutcome"
                          item-text="textDate"
                          item-value="valueDate"
                          @change="changeOutcome"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12">
                        <line-chart
                          :data="dataOutcome"
                          xtitle="Date"
                          ytitle="Outcome"
                          :curve="false"
                          prefix="$"
                          :download="true"
                        ></line-chart>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
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
      dataMain: [],
      selectIncome: "",
      selectOutcome: "",
      dateStart: "",
      dateWeekly: "",
      dateMonthly: "",
      dateYearly: "",
      dateEnd: new Date().toISOString().substring(0, 10),
      startDate: "",
      endDate: new Date().toISOString().substring(0, 10),
      dataIncome: [],
      dataIncomeWeekly: [],
      dataIncomeMonthly: [],
      dataIncomeYearly: [],
      dataOutcome: [],
      dataOutcomeWeekly: [],
      dataOutcomeMonthly: [],
      dataOutcomeYearly: [],
      selectValueIncome: [
        { textDate: "Last 7 Days", valueDate: 7 },
        { textDate: "Last 1 Month", valueDate: 30 },
        { textDate: "Last 1 Years", valueDate: 365 },
      ],
      selectValueOutcome: [
        { textDate: "Last 7 Days", valueDate: 7 },
        { textDate: "Last 1 Month", valueDate: 30 },
        { textDate: "Last 1 Years", valueDate: 365 },
      ],
    };
  },

  methods: {
    changeIncome() {
      this.dateIncome();
    },

    changeOutcome() {
      this.dateOutcome();
    },

    dateIncome() {
      var date = new Date();
      date.setDate(date.getDate() - this.selectIncome);
      this.dateStart = date.toISOString().substring(0, 10);
      if (this.selectIncome == 7) {
        this.chartIncomeWeekly;
        this.dataIncome = this.dataIncomeWeekly;
      } else if (this.selectIncome == 30) {
        this.chartIncomeMonthly;
        this.dataIncome = this.dataIncomeMonthly;
      } else if (this.selectIncome == 365) {
        this.chartIncomeYearly;
        this.dataIncome = this.dataIncomeYearly;
      } else {
        this.dataIncome;
      }
      console.log(this.dateStart);
    },

    chartIncomeWeekly() {
      var dateWeekly = new Date();
      dateWeekly.setDate(dateWeekly.getDate() - 7);
      this.dateWeekly = dateWeekly.toISOString().substring(0, 10);
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(
        uri +
          "/api/dashboard/income-chart" +
          "?startDate=" +
          this.dateWeekly +
          "&endDate=" +
          this.dateEnd +
          "&showType=daily",
        {
          headers,
        }
      )
        .then((res) => {
          this.dataIncomeWeekly = res.data.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    chartIncomeMonthly() {
      var dateMonthly = new Date();
      dateMonthly.setDate(dateMonthly.getDate() - 30);
      this.dateMonthly = dateMonthly.toISOString().substring(0, 10);
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(
        uri +
          "/api/dashboard/income-chart" +
          "?startDate=" +
          this.dateMonthly +
          "&endDate=" +
          this.dateEnd +
          "&showType=daily",
        {
          headers,
        }
      )
        .then((res) => {
          this.dataIncomeMonthly = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    chartIncomeYearly() {
      var dateYearly = new Date();
      dateYearly.setDate(dateYearly.getDate() - 365);
      this.dateYearly = dateYearly.toISOString().substring(0, 10);
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(
        uri +
          "/api/dashboard/income-chart" +
          "?startDate=" +
          this.dateYearly +
          "&endDate=" +
          this.dateEnd +
          "&showType=monthly",
        {
          headers,
        }
      )
        .then((res) => {
          this.dataIncomeYearly = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    dateOutcome() {
      var date = new Date();
      date.setDate(date.getDate() - this.selectOutcome);
      this.startDate = date.toISOString().substring(0, 10);
      if (this.selectOutcome == 7) {
        this.chartOutcomeWeekly;
        this.dataOutcome = this.dataOutcomeWeekly;
      } else if (this.selectOutcome == 30) {
        this.chartOutcomeMonthly;
        this.dataOutcome = this.dataOutcomeMonthly;
      } else if (this.selectOutcome == 365) {
        this.chartOutcomeYearly;
        this.dataOutcome = this.dataOutcomeYearly;
      } else {
        this.dateOutcome;
      }
    },

    chartOutcomeWeekly() {
      var dateWeekly = new Date();
      dateWeekly.setDate(dateWeekly.getDate() - 7);
      this.dateWeekly = dateWeekly.toISOString().substring(0, 10);
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(
        uri +
          "/api/dashboard/outcome-chart" +
          "?startDate=" +
          this.dateWeekly +
          "&endDate=" +
          this.endDate +
          "&showType=daily",
        {
          headers,
        }
      )
        .then((res) => {
          this.dataOutcomeWeekly = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chartOutcomeMonthly() {
      var dateMonthly = new Date();
      dateMonthly.setDate(dateMonthly.getDate() - 30);
      this.dateMonthly = dateMonthly.toISOString().substring(0, 10);
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(
        uri +
          "/api/dashboard/outcome-chart" +
          "?startDate=" +
          this.dateMonthly +
          "&endDate=" +
          this.endDate +
          "&showType=daily",
        {
          headers,
        }
      )
        .then((res) => {
          this.dataOutcomeMonthly = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chartOutcomeYearly() {
      var dateYearly = new Date();
      dateYearly.setDate(dateYearly.getDate() - 365);
      this.dateYearly = dateYearly.toISOString().substring(0, 10);
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(
        uri +
          "/api/dashboard/outcome-chart" +
          "?startDate=" +
          this.dateYearly +
          "&endDate=" +
          this.endDate +
          "&showType=monthly",
        {
          headers,
        }
      )
        .then((res) => {
          this.dataOutcomeYearly = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.chartIncomeWeekly();
    this.chartIncomeMonthly();
    this.chartIncomeYearly();
    this.chartOutcomeWeekly();
    this.chartOutcomeMonthly();
    this.chartOutcomeYearly();
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

    Proxy.get(uri + "/api/dashboard/income-chart", {
      headers,
    })
      .then((res) => {
        this.dataIncome = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    Proxy.get(uri + "/api/dashboard/outcome-chart", {
      headers,
    })
      .then((res) => {
        this.dataOutcome = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
