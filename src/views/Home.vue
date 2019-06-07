<template>
  <div>
    <div v-if="!loading">
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-carousel
              height="740"
              delimiter-icon="stop"
              prev-icon="mdi-arrow-left"
              next-icon="mdi-arrow-right"
            >
              <v-carousel-item
                v-for="(product, i) in promoProducts"
                :key="i"
                :src="product.imageSrc"
              ></v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container grid-list-lg>
        <v-layout row>

          <v-flex xs12>
            <h1>Наши автомобили</h1>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="(product, i) in products"
            :key="i"
          >
            <router-link
              :area-label="product.title"
              :to="'/cars/car/' + product.id"
            >
              <v-img
                class="white--text"
                height="350px"
                :src="product.imageSrc"
              >
                <v-container
                  fill-height
                  fluid
                >
                  <v-layout fill-height>
                    <v-flex
                      xs12
                      align-end
                      flexbox
                    >
                      <span class="headline">{{product.title}}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </router-link>

            <v-card>

              <v-card-title>
                <div>
                  <span class="grey--text">От {{product.price}}$/сутки</span><br>
                  <span>{{product.description}}</span><br>
                </div>
              </v-card-title>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  color="orange"
                  :to="'/cars/car/' + product.id"
                >Описание</v-btn>
                <app-buy-dialog :product="product"></app-buy-dialog>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-layout>
          <v-flex
            xs12
            class="text-xs-center pt-5"
          >
            <v-progress-circular
              :size="100"
              color="amber"
              indeterminate
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>

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
    promoProducts() {
      return this.$store.getters.promoProducts;
    },
    products() {
      return this.$store.getters.products;
    }
  }
};
</script>

<style lang="scss" scoped>
.headline {
  background-color: #ffca28;
  color: #000;
  text-decoration: none;
}

.application a {
  text-decoration: none;
}

.grey--text {
  text-transform: uppercase;
  font-size: 18px;
}
</style>
