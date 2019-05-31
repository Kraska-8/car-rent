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
              Car Rent Logo
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
          v-for="item in navItems"
          :key="item.id"
          :to="item.url"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Auto Rent Logo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="item in navItems"
          :key="item.id"
          flat
          :to="item.url"
        >
          <v-icon
            v-if="item.id==4"
            left
            color="orange lighten-3"
          >{{ item.icon }}</v-icon>{{ item.title }}
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
      navItems: [
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
      ],
      sideNav: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>