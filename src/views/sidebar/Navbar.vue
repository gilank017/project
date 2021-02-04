<template>
  <nav>
    <v-app-bar color="light-blue darken-3" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Prima</span>
        <span>Electrical</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="redirectlogin">
        <span>Log Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="white">
      <v-layout column align-center dark app class="light-blue darken-3">
        <v-card-title>
          <span class="white--text heading mt-1 text-center"
            >ADMINISTRATOR</span
          >
        </v-card-title>
      </v-layout>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          active-class="border"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  methods: {
    redirectlogin() {
      localStorage.removeItem("access_token");
      this.$router.push("/");
    },
  },
  data: () => ({
    drawer: true,
    links: [
      { icon: "dashboard", text: "Dasboard", route: "/Menu/Dashboard" },
      { icon: "person", text: "Contact", route: "/Menu/Contact" },
      { icon: "store", text: "Product", route: "/Menu/Product" },
      { icon: "shopping_cart", text: "Order", route: "/Menu/Order" },
    ],
  }),
};
</script>

<style scoped>
.border {
  border-left: 4px solid rgb(7, 68, 235);
}
</style>
