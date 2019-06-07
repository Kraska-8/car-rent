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
    <v-layout
      row
      v-if="!loading && myProducts.length !=0 "
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h1>Наши автомобили</h1>
        <v-card
          class="my-3"
          v-for="(product, i) in myProducts"
          :key="i"
        >
          <v-img
            :src="product.imageSrc"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{product.title}}</h3>
              <div> {{product.description}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn
              color="amber lighten-1"
              :to="'cars/car/'+ product.id"
            >Открыть</v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myProducts.length ==0">
      <v-flex
        xs-12
        class="text-xs-center"
      >
        <h1>У вас нет продуктов</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex
        xs-12
        class="text-xs-center"
      >
        <v-progress-circular
          :size="100"
          color="amber"
          indeterminate
        ></v-progress-circular>
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
          text: "Автомобили",
          disabled: true,
          href: "cars"
        }
      ]
    };
  },
  computed: {
    myProducts() {
      return this.$store.getters.myProducts;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>