<template>
  <v-app>
    <Navbar />
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Navbar from "./components/UI/Navbar/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>

