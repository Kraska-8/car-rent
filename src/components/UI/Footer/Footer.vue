<template>
  <v-footer
    height="auto"
    class="elevation-12 footer mt-2"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        flat
      >
        {{ link.title }}
      </v-btn>

      <v-flex
        grey
        lighten-2
        py-3
        text-xs-center
        xs12
      >
        &copy;2019 — <strong>Car rent</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { id: 1, title: "Главная", icon: "home", url: "/" },
          { id: 2, title: "Автомобили", icon: "mdi-car-sports", url: "/cars" },
          {
            id: 3,
            title: "О нас",
            icon: "mdi-information-outline",
            url: "/about"
          },
          {
            id: 4,
            title: "Спецпредложения",
            icon: "mdi-tag-heart-outline",
            url: "/discount"
          },
          {
            id: 5,
            title: "Контакты",
            icon: "mdi-account-box-outline",
            url: "/contact"
          },
          {
            id: 7,
            title: "Добавить",
            icon: "mdi-plus",
            url: "/new-car"
          },
          {
            id: 8,
            title: "Заказы",
            icon: "mdi-heart-outline",
            url: "/checkout"
          }
        ];
      }
      return [
        { id: 1, title: "Главная", icon: "home", url: "/" },
        { id: 2, title: "Автомобили", icon: "mdi-car-sports", url: "/cars" },
        {
          id: 3,
          title: "О нас",
          icon: "mdi-information-outline",
          url: "/about"
        },
        {
          id: 4,
          title: "Спецпредложения",
          icon: "mdi-tag-heart-outline",
          url: "/discount"
        },
        {
          id: 5,
          title: "Контакты",
          icon: "mdi-account-box-outline",
          url: "/contact"
        },
        {
          id: 6,
          title: "Логин",
          icon: "mdi-login",
          url: "/login"
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

