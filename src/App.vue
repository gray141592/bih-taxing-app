<template>
  <v-app>
    <router-link to="/">
      <v-app-bar
      app
      color="primary"
      href="/"
      dark
    >
      <h3>PDV Applikacija</h3>
    </v-app-bar>
    </router-link>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
  }),
});
</script>
