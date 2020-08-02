<template>
    <div>
        <v-card flat>
            <toolbar back-btn
                     back-route="/"
                     title="О нас">
            </toolbar>
            <v-container>
                <v-card>
                    <v-card-text>
                        <p>
                            Тут о нас
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
        name: "AboutUs",
        components: {BpdFooter, Toolbar}
    }
</script>

<style scoped>

</style>