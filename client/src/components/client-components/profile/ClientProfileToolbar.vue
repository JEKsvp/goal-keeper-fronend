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

        <v-spacer></v-spacer>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-app-bar-nav-icon v-bind="attrs"
                                    v-on="on">
                </v-app-bar-nav-icon>
            </template>

            <v-list>
                <v-list-item to="/client/therapists">
                    <v-list-item-icon>
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Терапевты</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>

    </v-toolbar>
</template>

<script>
    import Colors from "../../../util/Colors";

    export default {
        name: "ClientProfileToolbar",
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

        data: () => ({}),

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