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

    <v-content class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="4">
          <v-card class="elevation-12">
            <v-row>
              <v-col cols="12">
                <h2 class="text-center mb-8 pt-8">Login</h2>
                <v-card-text class="center">
                  <v-form v-model="valid">
                    <v-text-field
                      v-model="logininfo.email"
                      label="Email"
                      name="email"
                      prepend-icon="mdi-email"
                      type="text"
                      :rules="[required('email')]"
                    />
                    <v-text-field
                      v-model="logininfo.password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      :type="ShowPassword ? 'text' : 'password'"
                      :append-icon="ShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="ShowPassword = !ShowPassword"
                      :rules="[required('password'), minLength('password', 6)]"
                    />
                  </v-form>
                </v-card-text>
                <div class="text-center mt-8 pb-8">
                  <v-btn rounded color="light-blue darken-3" dark @click="Login"
                    >Login</v-btn
                  >
                  <v-alert v-if="alert" type="error"
                    >Invalid Email and password</v-alert
                  >
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import Proxy from "../services/proxy";
import validations from "@/utils/validations";
export default {
  data() {
    return {
      ShowPassword: false,
      logininfo: {
        email: "",
        password: "",
      },
      ...validations,
      snackbar: {
        show: false,
        text: "",
        color: "",
      },
    };
  },
  methods: {
    async Login() {
      try {
        const uri = "https://api-dev.phantasmode.com/oauth/token";
        const body = {
          username: this.logininfo.email,
          password: this.logininfo.password,
          client_id: 2,
          client_secret: "X7T9bQ1wHCgXMwjEOODkffOlWN97vVkliLysSufk",
          grant_type: "password",
        };
        await Proxy.post(uri, body).then((response) => {
          if (response.data.access_token) {
            console.log("success");
            this.snackbar = {
              show: true,
              text: "Login Success",
              color: "success",
            };
            localStorage.setItem("access_token", response.data.access_token);
          }
          this.$router.push("/Menu/Dashboard");
        });
      } catch (error) {
        this.snackbar = { show: true, text: "Login Failed", color: "error" };
      }
    },
  },
};
</script>
