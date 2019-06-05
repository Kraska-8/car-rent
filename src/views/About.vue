<template>
  <v-container>
    <v-layout row>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <v-breadcrumbs
          :items="items"
          divider=">"
          class="pl-0"
        ></v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h1>О нас</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Главная",
          disabled: false,
          to: "/"
        },
        {
          text: "О нас",
          disabled: true,
          href: "about"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>