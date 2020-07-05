<template>
    <v-toolbar color="teal lighten-2"
               dark tile>
        <v-toolbar-title>
            {{title}}
        </v-toolbar-title>
    </v-toolbar>
</template>

<script>
    export default {
        name: "Toolbar",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>