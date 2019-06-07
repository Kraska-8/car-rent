<template>
  <v-container>
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
        <h1>Заказы</h1>

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
            <v-list-tile-action>
              <v-checkbox
                :input-value="order.done"
                color="success"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="/car/+ order.productId"
                color="amber lighten-1"
              >Открыть</v-btn>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>
      </v-flex>
      <v-flex
        xs12
        class="text-xs-center"
        v-else
      >
        <h1>Заказов пока нет</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderDone", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    }
  },
  created() {
    this.$store.dispatch("fetchOrders");
  }
};
</script>

<style lang="scss" scoped>
</style>