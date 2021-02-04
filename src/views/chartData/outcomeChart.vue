<template>
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
</template>

<script>
import Proxy from "@/services/proxy";
export default {
  name: "outcomeChart",
  data() {
    return {
      selectOutcome: { textDate: "Last 7 Days", valueDate: 7 },
      dateWeekly: "",
      dateMonthly: "",
      dateYearly: "",
      startDate: "",
      endDate: new Date().toISOString().substring(0, 10),
      dataOutcome: [],
      dataOutcomeWeekly: [],
      dataOutcomeMonthly: [],
      dataOutcomeYearly: [],
      selectValueOutcome: [
        { textDate: "Last 7 Days", valueDate: 7 },
        { textDate: "Last 1 Month", valueDate: 30 },
        { textDate: "Last 1 Years", valueDate: 365 },
      ],
    };
  },
  methods: {
    changeOutcome() {
      this.dateOutcome();
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
    outcomeData() {
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
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
  },
  mounted() {
    this.chartOutcomeWeekly();
    this.chartOutcomeMonthly();
    this.chartOutcomeYearly();
    this.outcomeData();
  },
};
</script>
