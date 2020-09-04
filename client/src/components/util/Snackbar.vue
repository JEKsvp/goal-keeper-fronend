<template>
    <v-snackbar top
                v-model="show"
                :color="color"
                :timeout="timeout">
        <v-container class="ma-0 pa-0">
            <v-row class="pa-0 ma-0">
                <v-col class="text-center pa-0 ma-0">
                    {{text}}
                </v-col>
            </v-row>
        </v-container>
    </v-snackbar>
</template>

<script>

    export default {
        name: 'snackbar',

        data() {
            return {
                show: false,
                color: '',
                text: '',
                timeout: 3000
            }
        },
    }
</script>