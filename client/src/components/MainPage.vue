<template>
    <v-container>

        <v-layout>
            <v-flex text-xs-center>
                <v-btn @click="logout" color="error">Выйти</v-btn>
            </v-flex>
        </v-layout>

        <v-bottom-nav :active.sync="bottomNav"
                      :value="true"
                      absolute
                      color="transparent">
            <v-btn color="info"
                   flat
                   value="add">
                <v-icon>add_circle_outline</v-icon>
            </v-btn>
            <v-btn color="info"
                   flat
                   value="targets">
                <v-icon>list_alt</v-icon>
            </v-btn>
            <v-btn color="info"
                   flat
                   value="account">
                <v-icon>account_circle</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-container>
</template>

<script>

    import UserService from '../service/UserService'

    export default {
        name: 'main-page',

        async created() {
            let currentUser = await UserService.getCurrentUser();
            this.$store.commit('setCurrentUser', currentUser);
        },

        data() {
            return {
                bottomNav: 'targets'
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