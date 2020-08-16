<template>
    <v-card flat>
        <toolbar title="Профиль"></toolbar>
        <v-container>
            <v-skeleton-loader v-if="isLoading"
                               type="list-item-three-line">
            </v-skeleton-loader>
            <v-card tile v-if="!isLoading">
                <v-card-text>
                    <p>Имя пользователя: {{user.username}}</p>
                    <p>E-mail: {{user.email}}</p>
                    <div v-if="isTherapist">
                        <p>Имя: {{user.firstName}}</p>
                        <p>Фамилия: {{user.lastName}}</p>
                        <p>Обо мне: {{user.aboutMe}}</p>
                    </div>
                </v-card-text>
            </v-card>

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

    export default {
        name: 'user-page',
        components: {Btn, Toolbar},
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