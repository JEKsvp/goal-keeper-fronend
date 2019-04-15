<template>
    <v-form>
        <v-container fill-height>
            <v-layout align-center justify-center column mt-5>
                <logo></logo>
                <v-flex pt-5 mt-2>
                    <v-text-field label="Логин"></v-text-field>
                    <v-text-field label="Пароль"></v-text-field>
                </v-flex>
                <v-flex>
                    <v-btn color="success">Войти</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
    import Logo from "../Logo";

    export default {
        components: {Logo}
    };
</script>

