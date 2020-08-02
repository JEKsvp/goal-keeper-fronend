<template>
    <v-container>
        <template v-if="!isLoading">
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
        </template>
    </v-container>
</template>

<script>
    import Logo from "./util/Logo";
    import Btn from "./util/Btn";
    import UserService from "../service/UserService";

    export default {
        name: "enter-page",
        components: {Btn, Logo},
        data() {
            return {
                goals: [],
                isLoading: false
            };
        },
        async created() {
            try {
                this.isLoading = true;
                let currentUser = await UserService.getCurrentUser();
                await this.$router.push({name: "Diary", params: {username: currentUser.username}})
            } catch (e) {
                console.debug('User unauthorized')
            } finally {
                this.isLoading = false;
            }
        },
        methods: {}
    };
</script>

