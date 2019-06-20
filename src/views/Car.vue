<template>
  <v-container>
    <section v-if="!loading && product">
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
          >
            <template v-slot:item="props">
              <a
                :href="props.item.href"
                class="v-breadcrumbs__item"
              >{{ props.item.text }}</a>
              <a
                v-if="props.item.disabled"
                class="v-breadcrumbs__item v-breadcrumbs__item--disabled"
              >{{ product.title }}</a>
            </template>
          </v-breadcrumbs>
        </v-flex>
      </v-layout>

      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          offset-sm3
        >
          <v-layout>
            <v-flex
              xs12
              lg6
            >
              <v-img
                class="my-3"
                :src="product.imageSrc"
                aspect-ratio="1"
              ></v-img>
            </v-flex>
            <v-flex
              xs12
              lg6
              class="ml-4"
            >
              <h1>{{product.title}}</h1>
              <p class="title">Описание:</p>
              <p class="description">{{product.description}}</p>
              <p class="price">Начиная от: <span>${{product.price}}</span></p>
              <!-- <app-edit-product
                :product="product"
                v-if="isOwner"
              ></app-edit-product> -->
              <app-buy-dialog :product="product"></app-buy-dialog>
              <div>

                <v-btn
                  flat
                  small
                  class="ml-0"
                  @click="!order ? onSave() : onDelete()"
                >
                  <v-icon
                    left
                    :color="order ? 'pink' : 'dark'"
                  >favorite</v-icon>{{!order ? 'Добавить в избранное' : 'Удалить из избранного'}}
                </v-btn>
              </div>
            </v-flex>

          </v-layout>
        </v-flex>
      </v-layout>
    </section>

    <section
      v-else-if="!loading && !product"
      class="text-xs-center"
    >
      <v-progress-circular
        :size="100"
        color="amber"
        indeterminate
      ></v-progress-circular>
    </section>

  </v-container>
</template>

<script>
import * as firebase from "firebase";
import EditProduct from "../components/Products/EditProduct";
export default {
  props: ["id"],
  data() {
    return {
      items: [
        {
          text: "Главная",
          disabled: false,
          href: "/"
        },
        {
          text: "Автомобили",
          disabled: false,
          href: "/cars"
        },
        {
          text: "",
          disabled: true
        }
      ]
    };
  },
  components: {
    appEditProduct: EditProduct
  },
  methods: {
    onSave() {
      this.$store.dispatch("makeFav", {
        title: this.product.title,
        description: this.product.description,
        imageSrc: this.product.imageSrc,
        productId: this.id
      });
      this.$store.dispatch("fetchOrders");
    },
    onDelete() {
      const id = this.order.id;
      this.$store.dispatch("deleteFav", id);
      this.$store.dispatch("fetchOrders");
    }
  },
  computed: {
    product() {
      const id = this.id;
      return this.$store.getters.productById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    order() {
      const id = this.id;
      return this.$store.getters.orderById(id);
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  padding: 0 0 20px;
  margin: 15px 0 20px;
  font-size: 30px;
  color: #191509;
  font-weight: 400;
  text-align: left;
  position: relative;
  text-transform: uppercase;
}
p.title {
  font-size: 18px;
  font-weight: bold;
}
h1:before {
  content: "";
  width: 142px;
  height: 4px;
  background: #e0e0e0;
  position: absolute;
  left: 0;
  bottom: 0;
}
p .description {
  line-height: 1.8;
}
.price {
  margin-bottom: 15px;
  font-size: 18px;
  text-transform: uppercase;
  color: #9a9a9a;
}
.price span {
  font-size: 36px;
  color: #ffca28;
}
</style>
