<template>
    <v-container>
        <template v-if="!isLoading">
            <v-row mt-5>
                <v-col class="text-center">
                    <logo></logo>
                </v-col>
            </v-row>
            <v-row pb-5>
                <v-col class="text-center">
                    <btn type="secondary" to="/signup">Регистрация</btn>
                </v-col>
            </v-row>
            <div class="text-center text-subtitle-1">или</div>
            <v-row mt-0 pt-0>
                <v-col class="text-center">
                    <btn large type="primary" to="/signin">Вход</btn>
                </v-col>
            </v-row>
        </template>
        <bpd-footer></bpd-footer>
    </v-container>
</template>

<script>
    import Logo from "./util/Logo";
    import Btn from "./util/Btn";
    import UserService from "../service/UserService";
    import BpdFooter from "./util/BpdFooter";

    export default {
        name: "WelcomePage",
        components: {BpdFooter, Btn, Logo},
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

