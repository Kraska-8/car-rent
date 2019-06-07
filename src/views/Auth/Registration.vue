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
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md6
      >
        <v-card class="elevation-12">
          <v-toolbar
            dark
            color="grey darken-4"
          >
            <v-toolbar-title>Регистрация</v-toolbar-title>
            <v-spacer></v-spacer>

          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
                v-model="email"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Пароль"
                :rules="passwordRules"
                type="password"
                v-model="password"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="repeat"
                name="confPassword"
                label="Подтвердите пароль"
                :rules="confirmPasswordRules"
                type="password"
                v-model="confirmPassword"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmit"
              color="amber lighten-1"
              :loading="loading"
              :disabled="!valid || loading"
            >Создать аккаунт</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { rulesMixin } from "@/mixins";
export default {
  mixins: [rulesMixin],
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      valid: false,
      items: [
        {
          text: "Главная",
          disabled: false,
          to: "/"
        },
        {
          text: "Регистрация",
          disabled: true,
          href: "registration"
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
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        console.log("user :", user);
        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>