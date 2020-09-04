<template>
    <v-card flat>
        <toolbar title="Поиск терапевта" back-btn></toolbar>
        <v-skeleton-loader v-if="isLoading"
                           type="list-item-three-line">
        </v-skeleton-loader>
        <v-container class="pb-0 mb-0" v-if="!isLoading">
            <v-row>
                <v-col>
                    <v-text-field v-model="filter.searchQuery"
                                  placeholder="Имя терапевта"
                                  :loading="isSearching"
                                  outlined
                                  hide-details
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-list>
                <template v-if="therapists.length > 0" v-for="therapist in therapists">
                    <v-list-item :key="therapist.username" :to="`/client/therapists/${therapist.username}`">
                        <v-list-item-content>{{therapist.firstName}} {{therapist.lastName}}</v-list-item-content>
                    </v-list-item>
                    <v-divider :key="therapist.username + 'divider'"></v-divider>
                </template>
                <v-list-item v-if="therapists.length === 0">
                    <v-list-item-content>
                        Терапевты не найдены
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-pagination v-show="therapists.length > 0"
                          v-model="filter.displayPage"
                          total-visible="6"
                          :length="paging.totalPages"
                          @input="changePage">
            </v-pagination>
        </v-container>
    </v-card>
</template>

<script>
    import Toolbar from "../../util/Toolbar";
    import TherapistService from "../../../service/TherapistService";
    import AutocompleteSearchExecutor from "../../../util/AutocompleteSearchExecutor";

    export default {
        name: "TherapistSearchPage",
        components: {Toolbar},
        data() {
            return {
                isLoading: false,
                isSearching: false,
                searchExecutor: new AutocompleteSearchExecutor(this.updateTherapists, 500),
                therapists: [],
                filter: {
                    searchQuery: null,
                    displayPage: 1,
                    size: 10
                },
                paging: {},
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

        computed: {
            searchQuery() {
                return this.filter.searchQuery;
            }
        },

        watch: {
            async searchQuery() {
                await this.searchTherapists(this.searchQuery)
            }
        },

        methods: {

            async searchTherapists(query) {
                this.filter.displayPage = 1;
                this.searchExecutor.search(query)
            },

            async updateTherapists(query) {
                try {
                    this.isSearching = true;
                    let page = await TherapistService.findTherapists(
                        {
                            page: this.filter.displayPage - 1,
                            size: this.filter.size,
                            query: query
                        }
                    );
                    this.therapists = page.data;
                    this.paging = page.paging
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка загрузки списка терапевтов")
                } finally {
                    this.isSearching = false;
                }
            },

            async changePage(page) {
                this.filter.displayPage = page;
                await this.updateTherapists(this.searchQuery);
            },
        }
    }
</script>

<style scoped>

</style>