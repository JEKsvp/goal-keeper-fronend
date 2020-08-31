<template>
    <v-bottom-navigation app>
        <v-btn :to="`/home/users/${getCurrentUser.username}`">
            <span>Профиль</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn :to="`/home/users/${getCurrentUser.username}/diary/`">
            <span>Дневник</span>
            <v-icon>mdi-format-list-text</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    export default {
        name: "ClientBottomNavigation",

        computed: {
            getCurrentUser() {
                return this.$store.state.currentUser;
            }
        }
    }
</script>

<style scoped>

</style>