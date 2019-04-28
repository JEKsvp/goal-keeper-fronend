<template>
    <v-snackbar top
                v-model="show"
                :color="color"
                :timeout="3000">
        <v-container style="margin: 0">
            <v-layout>
                <v-flex text-xs-center>
                    {{text}}
                </v-flex>
            </v-layout>
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
                text: ''
            }
        },
    }
</script>