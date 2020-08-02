<template>
    <v-card height="100%">
        <template v-if="!isLoading">
            <v-main>
                <router-view></router-view>
            </v-main>
            <v-bottom-navigation app>
                <v-btn :to="`/home/users/${currentUser.username}`">
                    <span>Profile</span>
                    <v-icon>mdi-account</v-icon>
                </v-btn>
                <v-btn :to="`/home/users/${currentUser.username}/diary/`">
                    <span>Diary</span>
                    <v-icon>mdi-format-list-text</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </template>
        <template v-else>
            <v-skeleton-loader height="100%" type="card">
            </v-skeleton-loader>
        </template>
    </v-card>
</template>

<script>

    import UserService from '../service/UserService'

    export default {
        name: 'main-page',

        data() {
            return {
                currentUser: null,
                isLoading: true
            }
        },

        async created() {
            try {
                this.isLoading = true;
                this.currentUser = await UserService.getCurrentUser();
                this.$store.commit('setCurrentUser', this.currentUser);
                if (this.$route.name === 'Home') {
                    await this.$router.push({name: "Diary", params: {username: this.currentUser.username}})
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

        methods: {}
    }
</script>