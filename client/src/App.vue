<template id="main-page">
    <v-app>
        <router-view></router-view>
        <snackbar ref="snackbarPlugin"></snackbar>
    </v-app>
</template>

<script>


    import MainPage from "./components/WelcomePage";
    import Snackbar from "./components/util/Snackbar";

    export default {
        name: 'app',
        components: {Snackbar, MainPage},
    }
</script>

<style>
</style>
