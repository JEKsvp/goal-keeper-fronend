<template>
    <v-container>
        <v-row pb-5>
            <v-col class="text-right">
                <btn color="create" to="/signup">Регистрация</btn>
            </v-col>
        </v-row>
        <v-row mt-5>
            <v-col class="text-center">
                <logo></logo>
            </v-col>
        </v-row>
        <v-row mt-5 pt-5>
            <v-col class="text-center">
                <btn large to="/signin">Вход</btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Logo from "./util/Logo";
    import Btn from "./util/Btn";

    export default {
        name: "enter-page",
        components: {Btn, Logo},
        data() {
            return {
                goals: [],
                isLoading: false
            };
        },
        created() {
        },
        methods: {}
    };
</script>

