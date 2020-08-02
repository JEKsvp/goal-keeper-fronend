<template>
    <div>
        <v-card flat>
            <toolbar back-btn
                     back-route="/"
                     title="Контакты">
            </toolbar>
            <v-container>
                <v-card>
                    <v-card-text>
                        <p>Вопросы, пожелания и замечания пишите на
                            <a href="mailto:abadeksvp@mail.com">abadeksvp@mail.com</a>
                        </p>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-card>
        <bpd-footer></bpd-footer>
    </div>
</template>

<script>
    import Toolbar from "../util/Toolbar";
    import BpdFooter from "../util/BpdFooter";

    export default {
        name: "Contacts",
        components: {BpdFooter, Toolbar}
    }
</script>

<style scoped>

</style>