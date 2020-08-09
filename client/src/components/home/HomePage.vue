<template>
    <v-card height="100%">
        <template v-if="!isLoading">
            <v-main>
                <router-view></router-view>
            </v-main>
            <patient-bottom-navigation v-if="isPatient"></patient-bottom-navigation>
            <psychotherapist-bottom-navigation v-if="isPsychotherapist"></psychotherapist-bottom-navigation>
        </template>
        <template v-else>
            <v-skeleton-loader height="100%" type="card">
            </v-skeleton-loader>
        </template>
    </v-card>
</template>

<script>

    import UserService from '../../service/UserService'
    import PatientBottomNavigation from "./PatientBottomNavigation";
    import Roles from "../../util/Roles";
    import PsychotherapistBottomNavigation from "./PsychotherapistBottomNavigation";

    export default {
        name: 'main-page',
        components: {PsychotherapistBottomNavigation, PatientBottomNavigation},
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
            isPatient() {
                return this.currentUser.roles.includes(Roles.PATIENT)
            },

            isPsychotherapist() {
                return this.currentUser.roles.includes(Roles.PSYCHOTHERAPIST)
            }
        },

        methods: {
            async loadCurrentUser() {
                this.currentUser = await UserService.getCurrentUser();
                this.$store.commit('setCurrentUser', this.currentUser);
            },

            redirectToMainPage() {
                if (this.isPatient) {
                    this.$router.push({name: "Diary", params: {username: this.currentUser.username}})
                } else {
                    this.$router.push({name: "User", params: {username: this.currentUser.username}})

                }
            }
        }
    }
</script>