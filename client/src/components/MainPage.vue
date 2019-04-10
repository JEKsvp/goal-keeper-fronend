<template>
    <v-container>
        <v-layout align-center>
            <v-btn color="success" to="/register">Регистрация</v-btn>
            <v-btn color="info" to="/login">Вход</v-btn>
        </v-layout>
        <router-view></router-view>
    </v-container>
</template>

<script>
    export default {
        name: "main-page",
        data() {
            return {
                goals: []
            };
        },
        methods: {}
    };
</script>

