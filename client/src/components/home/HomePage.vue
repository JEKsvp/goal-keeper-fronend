<template>
    <v-card height="100%">
        <template v-if="!isLoading">
            <v-main>
                <router-view></router-view>
            </v-main>
            <client-bottom-navigation v-if="isClient"></client-bottom-navigation>
            <therapist-bottom-navigation v-if="isTherapist"></therapist-bottom-navigation>
        </template>
        <template v-else>
            <v-skeleton-loader height="100%" type="card">
            </v-skeleton-loader>
        </template>
    </v-card>
</template>

<script>

    import UserService from '../../service/UserService'
    import ClientBottomNavigation from "./ClientBottomNavigation";
    import Roles from "../../util/Roles";
    import TherapistBottomNavigation from "./TherapistBottomNavigation";
    import AccessService from "../../service/access/AccessService";

    export default {
        name: 'main-page',
        components: {TherapistBottomNavigation, ClientBottomNavigation},
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
                if (this.$route.name === 'Home') {
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

        computed: {
            isClient() {
                return this.currentUser.roles.includes(Roles.CLIENT)
            },

            isTherapist() {
                return this.currentUser.roles.includes(Roles.THERAPIST)
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
                if (this.isClient) {
                    this.$router.push({name: "Diary", params: {username: this.currentUser.username}})
                } else {
                    this.$router.push({name: "User", params: {username: this.currentUser.username}})
                }
            }
        }
    }
</script>