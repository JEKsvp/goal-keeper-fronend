<template>
    <v-bottom-navigation app>
        <v-btn :to="`/home/users/${getCurrentUser.username}`">
            <span>Профиль</span>
            <v-icon>mdi-account</v-icon>
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