<template>
    <v-card flat>
        <toolbar title="Дневник"></toolbar>
        <v-container class="pb-0 mb-0" v-if="!isLoading">
            <v-list>
                <template v-for="(note) in notes">
                    <v-list-item :key="note.id"
                                 :to="`/home/users/${username}/diary/notes/${note.id}`">
                        <v-list-item-content>{{note.event.description}}</v-list-item-content>
                    </v-list-item>
                    <v-divider :key="note.id + 'divider'"
                    ></v-divider>
                </template>
            </v-list>
        </v-container>
        <v-container class="pt-0 mt-0" v-if="!isLoading">
            <v-row>
                <v-col class="text-right">
                    <btn fab
                         color="create"
                         :to="`/home/users/${username}/diary/notes/create`">
                        <v-icon>mdi-plus</v-icon>
                    </btn>
                </v-col>
            </v-row>
        </v-container>
        <v-skeleton-loader v-if="isLoading"
                           type="list-item-three-line">
        </v-skeleton-loader>
    </v-card>
</template>

<script>
    import Toolbar from "../util/Toolbar";
    import DiaryService from "../../service/DiaryService";
    import NoteService from "../../service/NoteService";
    import Btn from "../util/Btn";

    export default {
        name: "Diary",
        components: {Btn, Toolbar},
        data: () => ({
            diary: {
                name: "Дневник"
            },
            notes: [],
            isLoading: false
        }),

        computed: {
            username() {
                return this.$route.params.username;
            }
        },

        async created() {
            try {
                this.isLoading = true;
                this.diary = await DiaryService.getDiaryByUsername(this.username);
                this.notes = await NoteService.getNotesByUsername(this.username);
                this.isLoading = false;
            } catch (e) {
                this.$showSnackbar("error", "Ошибка загрузки дневника")
            }
        },

        methods: {}
    }
</script>

<style scoped>

</style>