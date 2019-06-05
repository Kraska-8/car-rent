<template>
  <v-app>
    <Navbar />
    <Snackbar v-if="error" />
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Navbar from "./components/UI/Navbar/Navbar.vue";
import Snackbar from "./components/UI/Snackbar/Snackbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Snackbar
  },
  data() {
    return {
      //
    };
  },

  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>

