<template>
    <v-card height="100%">
        <v-toolbar color="teal lighten-2"
                   dark tile>
            <v-toolbar-title>
                Профиль
            </v-toolbar-title>
        </v-toolbar>
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

    export default {
        name: 'user-page',
        data() {
            return {
                user: {}
            }
        },
        async created() {
            let username = this.$route.params.username;
            this.user = await UserService.getUser(username);
        },

        methods: {
            logout() {
                this.$session.clear();
                this.$router.push('/');
            }
        }
    }
</script>