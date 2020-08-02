<template>
    <v-card flat>
        <toolbar title="Профиль"></toolbar>
        <v-container>
            <v-card tile>
                <v-card-title>{{user.username}}</v-card-title>
                <v-card-text>
                    <p>E-mail: {{user.email}}</p>
                </v-card-text>
            </v-card>

            <v-row>
                <v-col class="text-center mt-5">
                    <btn color="cancel" @click="logout">Выход</btn>
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

        methods: {
            async logout() {
                await LogoutService.logout();
                await this.$router.push('/');
            }
        }
    }
</script>