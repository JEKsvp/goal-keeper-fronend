<template>
    <v-container>
        <v-row pb-5>
            <v-col class="text-right">
                <v-btn color="success" to="/signup">Регистрация</v-btn>
            </v-col>
        </v-row>
        <v-row mt-5>
            <v-col class="text-center">
                <logo></logo>
            </v-col>
        </v-row>
        <v-row mt-5 pt-5>
            <v-col class="text-center">
                <v-btn large color="info" to="/signin">Вход</v-btn>
            </v-col>
        </v-row>
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
                this.$router.push('/home')
            }
        },
        methods: {}
    };
</script>

