<template>
    <v-card height="100%">
        <toolbar title="Профиль"></toolbar>
        <v-container>
            <v-btn @click="logout">Logout</v-btn>
            <v-row>
                <div>Пользователь {{user}}</div>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>

    import UserService from '../../service/UserService'
    import Toolbar from "../util/Toolbar";

    export default {
        name: 'user-page',
        components: {Toolbar},
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
            logout() {
                this.$session.clear();
                this.$router.push('/');
            }
        }
    }
</script>