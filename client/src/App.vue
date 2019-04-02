<template id="main-page">
  <v-app>
    <v-container>
        <v-layout align-center>
            <v-btn color="success" @click="test">Success</v-btn>
        </v-layout>
    </v-container>
  </v-app>
</template>

<script>

    export default {
        name: 'app',
        methods: {
          test(){
            this.$http.get("/api/v1/test").then(
              response => {
                console.log(response);
              },
              error => {
                console.error(error);
              }
            )
          }
        },
    }
</script>

<style>
</style>
