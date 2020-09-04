<template>
    <v-card height="100%">
        <template v-if="!isLoading">
            <v-main>
                <router-view></router-view>
            </v-main>
            <therapist-bottom-navigation></therapist-bottom-navigation>
        </template>
        <template v-else>
            <v-skeleton-loader height="100%" type="card">
            </v-skeleton-loader>
        </template>
    </v-card>
</template>

<script>
    import UserService from "../../service/UserService";
    import AccessService from "../../service/access/AccessService";
    import TherapistBottomNavigation from "./TherapistBottomNavigation";

    export default {
        name: "ClientHome",
        components: {TherapistBottomNavigation},

        data() {
            return {
                currentUser: null,
                isLoading: true
            }
        },

        async created() {
            try {
                this.isLoading = true;
                await this.loadCurrentUser();
                await this.loadCurrentUserAccesses();
                if (this.$route.name === 'TherapistHome') {
                    this.redirectToMainPage();
                }
                this.isLoading = false;
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    this.$showSnackbar("error", "Пожалуйста авторизуйтесь.")
                } else {
                    this.$showSnackbar("error", "Ошибка загрузки данных о пользователе.")
                }
            }
        },

        methods: {
            async loadCurrentUser() {
                this.currentUser = await UserService.getCurrentUser();
                this.$store.commit('setCurrentUser', this.currentUser);
            },

            async loadCurrentUserAccesses() {
                this.accesses = await AccessService.getCurrentUserAccesses();
                this.$store.commit('setAccesses', this.accesses);
            },

            redirectToMainPage() {
                this.$router.push({name: "TherapistClientList", params: {username: this.currentUser.username}})

            }
        }
    }
</script>

<style scoped>

</style>