<template id="main-page">
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>


    import MainPage from "./components/MainPage";
    export default {
        name: 'app',
        components: {MainPage},
    }
</script>

<style>
</style>
