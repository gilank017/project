<template>
  <v-app>
    <Navbar />
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/views/sidebar/Navbar";
export default {
  name: "app",
  components: {
    Navbar,
  },
};
</script>>