<template>
  <v-dialog
    v-model="dialog"
    width="400"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="amber lighten-1"
        v-on="on"
      >Забронировать</v-btn>
    </template>

    <v-card>
      <v-card-title
        class="headline"
        primary-title
      >
        Забронировать автомобиль
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          name="name"
          label="Ваше имя"
          type="text"
          v-model="name"
        ></v-text-field>
        <v-text-field
          name="phone"
          mask="(###) ### - ####"
          label="Номер телефона"
          type="text"
          v-model="phone"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          color="amber lighten-1"
          outline
          :disabled="localLoading"
          slot="activator"
          @click="onCancel"
        >
          Закрыть
        </v-btn>
        <v-btn
          :disabled="localLoading"
          :loading="localLoading"
          color="amber lighten-1"
          slot="activator"
          @click="onSave"
        >
          Забронировать
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
      name: "",
      phone: "",
      localLoading: false
    };
  },
  computed: {},
  methods: {
    onCancel() {
      this.dialog = false;
      this.name = this.phone = "";
    },
    onSave() {
      if ((this.name != this.phone) != "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            productId: this.product.id
          })
          .finally(() => {
            this.name = this.phone = "";
            this.localLoading = false;
            this.dialog = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>