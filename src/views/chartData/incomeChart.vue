<template>
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
</template>

<script>
import Proxy from "@/services/proxy";
export default {
  name: "incomeChart",
  data() {
    return {
      selectIncome: { textDate: "Last 7 Days", valueDate: 7 },
      dateStart: "",
      dateWeekly: "",
      dateMonthly: "",
      dateYearly: "",
      dateEnd: new Date().toISOString().substring(0, 10),
      dataIncome: [],
      dataIncomeWeekly: [],
      dataIncomeMonthly: [],
      dataIncomeYearly: [],
      selectValueIncome: [
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

    incomeData() {
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(uri + "/api/dashboard/income-chart", {
        headers,
      })
        .then((res) => {
          this.dataIncome = res.data.data;
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
    this.incomeData();
  },
};
</script>
>
