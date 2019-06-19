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
        class="text-xs-center pt-5"
        v-if="loading"
      >
        <v-progress-circular
          :size="100"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex
        xs12
        sm6
        offset-sm3
        v-else-if="!loading && orders.length !=0 "
      >
        <h1>Избранное</h1>

        <v-list
          subheader
          three-line
          class="mt-3"
        >
          <v-list-tile
            avatar
            v-for="(order, i) in orders"
            :key="i"
          >
            <v-list-tile-avatar>
              <img :src="order.imageSrc">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{order.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.description}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="'/cars/car/'+ order.productId"
                color="amber lighten-1"
              >Открыть</v-btn>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>
      </v-flex>

      <v-flex
        xs12
        sm6
        offset-sm3
        v-else
      >
        <h1>В избранном пока ничего нет</h1>
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
          text: "Избранное",
          disabled: true,
          href: "about"
        }
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  methods: {},
  created() {
    this.$store.dispatch("fetchOrders");
  }
};
</script>

<style lang="scss" scoped>
</style>