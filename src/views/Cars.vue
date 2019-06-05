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
        <h1>Наши автомобили</h1>
        <v-card
          class="my-3"
          v-for="(product, i) in products"
          :key="i"
        >
          <v-img
            :src="product.imageSrc"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{product.title}}</h3>
              <div> {{product.description}} </div>
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
    products() {
      return this.$store.getters.myProducts;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>