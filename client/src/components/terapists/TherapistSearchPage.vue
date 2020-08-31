<template>
    <v-card flat>
        <toolbar title="Поиск терапевта" back-btn></toolbar>
        <v-container class="pb-0 mb-0" v-if="!isLoading">
            <v-row>
                <v-col>
                    <v-text-field v-model="searchQuery"
                                  placeholder="Имя терапевта"
                                  outlined
                                  hide-details
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-list>
                <template v-for="therapist in therapists">
                    <v-list-item :key="therapist.username" :to="`/home/therapists/${therapist.username}`">
                        <v-list-item-content>{{therapist.firstName}} {{therapist.lastName}}</v-list-item-content>
                    </v-list-item>
                    <v-divider :key="therapist.username + 'divider'"></v-divider>
                </template>
            </v-list>
        </v-container>
        <v-skeleton-loader v-if="isLoading"
                           type="list-item-three-line">
        </v-skeleton-loader>
    </v-card>
</template>

<script>
    import Toolbar from "../util/Toolbar";
    import TherapistService from "../../service/TherapistService";
    import AutocompleteSearchExecutor from "../../util/AutocompleteSearchExecutor";

    export default {
        name: "TherapistSearchPage",
        components: {Toolbar},
        data() {
            return {
                isLoading: false,
                searchExecutor: new AutocompleteSearchExecutor(this.updateTherapists, 500),
                therapists: [],
                searchQuery: null
            }
        },

        async created() {
            this.isLoading = true;
            try {
                await this.updateTherapists();
            } finally {
                this.isLoading = false;
            }
        },

        watch: {
            search() {
            },

            async searchQuery() {
                await this.searchTherapists(this.searchQuery)
            }
        },

        methods: {

            async searchTherapists(query) {
                this.searchExecutor.search(query)
            },

            async updateTherapists(query) {
                try {
                    let page = await TherapistService.findTherapists({page: 0, size: 20, query: query});
                    this.therapists = page.data;
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка загрузки списка терапевтов")
                }
            }
        }
    }
</script>

<style scoped>

</style>