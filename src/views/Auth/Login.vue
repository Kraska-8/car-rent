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
            <v-toolbar-title>Логин</v-toolbar-title>
            <v-spacer></v-spacer>

          </v-toolbar>
          <v-card-text class="pa-4">
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
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn @click="$router.push({ path: 'registration' })">
              Регистрация
            </v-btn>
            <v-btn
              @click="onSubmit"
              :loading="loading"
              color="amber lighten-1"
              :disabled="!valid || loading"
            >Войти</v-btn>
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
      valid: false,
      items: [
        {
          text: "Главная",
          disabled: false,
          to: "/"
        },
        {
          text: "Логин",
          disabled: true,
          href: "login"
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
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    }
  },
  created() {
    if (this.$route.query["loginError"]) {
      this.$store.dispatch(
        "setError",
        "Пожалуйста, войдите в свой аккаунт, чтобы получить доступ к данной странице"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>