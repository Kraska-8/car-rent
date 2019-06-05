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
        <h1>Добавление автомобиля</h1>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            name="title"
            label="Название товара"
            type="text"
            required
            :rules="[v => !!v || 'Поле обязательно к заполнению']"
            v-model="title"
          ></v-text-field>
          <v-text-field
            name="price"
            label="Цена"
            mask="#########"
            type="text"
            :rules="[v => !!v || 'Поле обязательно к заполнению']"
            required
            v-model="price"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Описание товара"
            type="text"
            v-model="description"
          ></v-textarea>

          <v-switch
            color="success"
            v-model="promo"
            label="Промо"
          ></v-switch>
        </v-form>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-btn color="amber lighten-1">
              Загрузить фото
              <v-icon
                right
                dark
              >mdi-cloud-upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <img
              src=""
              alt=""
              height="200"
            >
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              color="amber lighten-1"
              @click="createProduct"
            >Добавить авто</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      price: "",
      promo: false,
      description: "",
      valid: false,
      items: [
        {
          text: "Главная",
          disabled: false,
          to: "/"
        },
        {
          text: "Добавить авто",
          disabled: true,
          href: "mew-car"
        }
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createProduct() {
      if (this.$refs.form.validate()) {
        const product = {
          title: this.title,
          price: this.price,
          promo: this.promo,
          description: this.description,
          imageSrc:
            "http://www.templates-preview.com/bootstrap-templates/300111914/images/gallery03.jpg"
        };
        this.$store
          .dispatch("createProduct", product)
          .then(() => {
            this.$router.push("/cars");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>