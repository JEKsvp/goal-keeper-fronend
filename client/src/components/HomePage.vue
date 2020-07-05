<template>
    <v-card height="100%">
        <template v-if="currentUser">
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

        async created() {
            this.currentUser = await UserService.getCurrentUser();
            this.$store.commit('setCurrentUser', this.currentUser);
        },

        data() {
            return {
                currentUser: null
            }
        },

        methods: {}
    }
</script>