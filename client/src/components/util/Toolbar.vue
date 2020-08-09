<template>
    <v-toolbar :color="getColor"
               dark tile>
        <v-btn v-if="backBtn"
               text
               icon
               color="white"
               @click="goBack">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>
            {{title}}
        </v-toolbar-title>
    </v-toolbar>
</template>

<script>
    import Colors from "../../util/Colors";

    export default {
        name: "Toolbar",
        props: {
            title: {
                type: String,
                required: true
            },
            backBtn: {
                type: Boolean,
                default: false
            },
            backRoute: {
                type: String
            }
        },

        computed: {
            getColor() {
                return Colors.TOOLBAR.BACKGROUND
            }
        },

        methods: {
            goBack() {
                if (this.backRoute) {
                    this.$router.push(this.backRoute)
                } else {
                    this.$router.back();
                }
            }
        }
    }
</script>

<style scoped>

</style>