<template>
    <v-container>
        <v-layout justify-end pb-5>
            <v-btn color="success" to="/register">Регистрация</v-btn>
        </v-layout>
        <v-layout justify-center mt-5>
            <logo></logo>
        </v-layout>
        <v-layout align-center justify-center column mt-5 pt-5>
            <v-btn large color="info" to="/login">Вход</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    import Logo from "./util/Logo";

    export default {
        name: "enter-page",
        components: {Logo},
        data() {
            return {
                goals: []
            };
        },
        created() {
            let token = this.$session.get('token');
            if (token) {
                this.$router.push('/main')
            }
        },
        methods: {}
    };
</script>

