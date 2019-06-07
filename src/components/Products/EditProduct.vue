<template>
  <v-dialog
    v-model="dialog"
    width="400"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="amber lighten-1"
        outline
        v-on="on"
      >
        Редактировать
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        Редактировать товар
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          name="title"
          label="Заголовок"
          type="text"
          v-model="editedTitle"
        ></v-text-field>
        <v-text-field
          name="price"
          label="Цена"
          type="text"
          v-model="editedPrice"
        ></v-text-field>
        <v-textarea
          name="description"
          label="Описание товара"
          type="text"
          v-model="editedDescription"
        ></v-textarea>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          color="amber lighten-1"
          outline
          slot="activator"
          @click="onCancel"
        >
          Отмена
        </v-btn>
        <v-btn
          color="amber lighten-1"
          slot="activator"
          @click="onSave"
        >
          Редактировать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      dialog: false,
      editedTitle: this.product.title,
      editedPrice: this.product.price,
      editedDescription: this.product.description
    };
  },
  computed: {},
  methods: {
    onCancel() {
      this.dialog = false;
      this.editedTitle = this.product.title;
      this.editedPrice = this.product.price;
      this.editedDescription = this.product.description;
    },
    onSave() {
      if (
        ((this.editedPrice != this.editedTitle) != this.editedDescription) !=
        ""
      ) {
        this.$store.dispatch("updateProduct", {
          title: this.editedTitle,
          price: this.editedPrice,
          description: this.editedDescription,
          id: this.product.id
        });
      }
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>