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
                    <btn large type="primary" dark to="/signin">Вход</btn>
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
    import Roles from "../util/Roles";

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
                const user = await UserService.getCurrentUser();
                if (user.roles.includes(Roles.CLIENT)) {
                    await this.$router.push({name: "ClientHome"})
                } else {
                    await this.$router.push({name: "TherapistHome"})
                }
            } catch (e) {
                console.debug('User unauthorized')
            } finally {
                this.isLoading = false;
            }
        },
        methods: {}
    };
</script>

