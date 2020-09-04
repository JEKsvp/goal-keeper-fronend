<template>
    <v-bottom-navigation app>
        <v-btn to="/therapist/profile">
            <span>Профиль</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn to="/therapist/clients">
            <span>Мои клиенты</span>
            <v-icon>mdi-account-group-outline</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    export default {
        name: "TherapistBottomNavigation",

        computed: {
            getCurrentUser() {
                return this.$store.state.currentUser;
            }
        }
    }
</script>

<style scoped>

</style>