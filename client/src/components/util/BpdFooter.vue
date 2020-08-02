<template>
    <v-footer absolute>
        <v-row justify="center">
            <btn text x-small to="/aboutus">О нас</btn>
            <btn text x-small to="/contacts">Контакты</btn>
        </v-row>
    </v-footer>
</template>

<script>
    import Btn from "./Btn";

    export default {
        name: "BpdFooter",
        components: {Btn}
    }
</script>

<style scoped>

</style>