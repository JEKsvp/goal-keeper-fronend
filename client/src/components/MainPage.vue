<template>
    <v-container>

        <v-layout>
            <v-flex text-xs-center>
                <v-btn @click="logout" color="error">Выйти</v-btn>
            </v-flex>
        </v-layout>
        <div>{{currentUser}}</div>
    </v-container>
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
                currentUser: {}
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