<template>
    <v-card flat>
        <profile-toolbar title="Профиль"></profile-toolbar>
        <v-container>
            <v-skeleton-loader v-if="isLoading"
                               type="list-item-three-line">
            </v-skeleton-loader>

            <therapist-user-page v-if="!isLoading && isTherapist"
                                 :user="user">
            </therapist-user-page>
            <client-user-page v-if="!isLoading && !isTherapist"
                              :is-loading="isLoading"
                              :user="user"
            ></client-user-page>
            <v-row>
                <v-col class="text-center mt-5">
                    <btn type="cancel" @click="logout">Выход</btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

    import UserService from '../../service/UserService'
    import Toolbar from "../util/Toolbar";
    import LogoutService from "../../service/LogoutService";
    import Btn from "../util/Btn";
    import Roles from "../../util/Roles";
    import ProfileToolbar from "../util/ProfileToolbar";
    import ClientUserPage from "./ClientUserPage";
    import TherapistUserPage from "./TherapistUserPage";

    export default {
        name: 'user-page',
        components: {TherapistUserPage, ClientUserPage, ProfileToolbar, Btn, Toolbar},
        data() {
            return {
                user: {},
                isLoading: false
            }
        },
        async created() {
            let username = this.$route.params.username;
            try {
                this.isLoading = true;
                this.user = await UserService.getUser(username);
                this.isLoading = false;
            } catch (e) {
                this.$showSnackbar("error", "Ошибка загрузки пользователя.")
            }
        },

        computed: {
            isTherapist() {
                return this.user.roles.includes(Roles.THERAPIST)
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