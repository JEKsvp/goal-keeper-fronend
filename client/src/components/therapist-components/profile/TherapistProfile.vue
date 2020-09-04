<template>
    <v-card flat>
        <therapist-profile-toolbar title="Мой профиль">
        </therapist-profile-toolbar>
        <v-container>
            <v-skeleton-loader v-if="isLoading"
                               type="list-item-three-line">
            </v-skeleton-loader>
            <therapist-profile-page v-if="!isLoading"
                                    :user="user">
            </therapist-profile-page>
            <v-row>
                <v-col class="text-center mt-5">
                    <btn type="cancel" @click="logout">Выход</btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

    import UserService from '../../../service/UserService'
    import Toolbar from "../../util/Toolbar";
    import LogoutService from "../../../service/LogoutService";
    import Btn from "../../util/Btn";
    import TherapistProfilePage from "./TherapistProfilePage";
    import TherapistProfileToolbar from "./TherapistProfileToolbar";

    export default {
        name: 'user-page',
        components: {TherapistProfileToolbar, TherapistProfilePage, Btn, Toolbar},
        data() {
            return {
                user: {},
                isLoading: false
            }
        },
        async created() {
            let username = this.$store.state.currentUser.username;
            try {
                this.isLoading = true;
                this.user = await UserService.getUser(username);
                this.isLoading = false;
            } catch (e) {
                this.$showSnackbar("error", "Ошибка загрузки пользователя.")
            }
        },

        methods: {
            async logout() {
                await LogoutService.logout();
                await this.$router.push('/');
            }
        }
    }
</script>