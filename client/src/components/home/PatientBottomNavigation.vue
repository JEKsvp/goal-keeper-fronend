<template>
    <v-bottom-navigation app>
        <v-btn :to="`/home/users/${getCurrentUser.username}`">
            <span>Profile</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn :to="`/home/users/${getCurrentUser.username}/diary/`">
            <span>Diary</span>
            <v-icon>mdi-format-list-text</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    export default {
        name: "PatientBottomNavigation",

        computed: {
            getCurrentUser() {
                return this.$store.state.currentUser;
            }
        }
    }
</script>

<style scoped>

</style>