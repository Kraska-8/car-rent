<template>
  <v-app class="app">
    <Navbar />
    <Snackbar v-if="error" />
    <Footer app></Footer>
  </v-app>
</template>

<script>
import Navbar from "./components/UI/Navbar/Navbar.vue";
import Snackbar from "./components/UI/Snackbar/Snackbar.vue";
import Footer from "./components/UI/Footer/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Snackbar,
    Footer
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

<style lang="scss">
html,
body {
  height: 100%;
}

.application--wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}
</style>

