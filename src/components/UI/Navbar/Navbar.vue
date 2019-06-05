<template>
  <div>
    <v-navigation-drawer
      v-model="sideNav"
      app
      temporary
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <router-link
                to="/"
                tag="span"
                class="pointer"
              >

                Car Rent Logo
              </router-link>

            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <v-list
        dense
        class="pt-0"
      >
        <v-list-tile
          v-for="item in links"
          :key="item.id"
          :to="item.url"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          @click="onLogout"
          v-if="isUserLoggedIn"
        >
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          class="pointer"
        >
          Auto Rent Logo
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          active-class="v-btn--active"
          v-for="item in links"
          :key="item.id"
          flat
          :to="item.url"
        >
          <v-icon
            v-if="item.id==4"
            left
            color="amber lighten-1"
          >{{ item.icon }}</v-icon>{{ item.title }}
        </v-btn>
        <v-btn
          flat
          v-if="isUserLoggedIn"
          @click="onLogout"
        >Выйти
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-title>+7 (812) 456 56 56</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>


<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
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
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>

