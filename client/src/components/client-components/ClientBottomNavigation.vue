<template>
    <v-bottom-navigation app>
        <v-btn to="/client/profile">
            <span>Профиль</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn to="/client/diary/">
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