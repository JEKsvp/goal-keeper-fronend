<template>
    <v-container>
        <v-row mt-5>
            <v-col class="text-center" pt-5 mt-2>
                <logo></logo>
            </v-col>
        </v-row>
        <v-tabs v-model="tab"
                background-color="transarent"
                :color="getTabColor"
                grow>
            <v-tab>Я Пациент</v-tab>
            <v-tab>Я Терапевт</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <sign-up-as-client></sign-up-as-client>
            </v-tab-item>
            <v-tab-item>
                <sign-up-as-therapist></sign-up-as-therapist>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>

    import Logo from "../util/Logo";
    import Colors from "../../util/Colors";
    import SignUpAsTherapist from "./SignUpAsTherapist";
    import SignUpAsClient from "./SignUpAsClient";

    export default {
        components: {SignUpAsClient, SignUpAsTherapist, Logo},
        data() {
            return {
                tab: 0
            }
        },

        computed: {
            getTabColor() {
                return Colors.TAB.PRIMARY
            }
        },

        methods: {}
    }
</script>
