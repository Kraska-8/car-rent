
<template>
  <v-snackbar
    :multi-line="true"
    :timeout="5000"
    color="error"
    @input="closeError"
    :value="true"
  >
    {{ error }}
    <v-btn
      dark
      flat
      @click.native="closeError"
    >
      Закрыть
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

