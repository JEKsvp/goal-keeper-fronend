<template>
    <v-card flat>
        <toolbar back-btn back-route="/client/diary" title="Запись"></toolbar>
        <v-container v-if="!isLoading">
            <v-container>
                <v-card tile>
                    <v-card-title>Событие</v-card-title>
                    <v-card-text>{{note.event.description}}</v-card-text>
                </v-card>
            </v-container>
            <v-container>
                <v-card tile>
                    <v-card-title>Эмоциональная оценка</v-card-title>
                    <v-card-text>{{note.emotionalEvaluation.description}}</v-card-text>
                </v-card>
            </v-container>
            <v-container>
                <v-card tile>
                    <v-card-title>Реакция тела</v-card-title>
                    <v-card-text>{{note.bodyReaction.description}}</v-card-text>
                </v-card>
            </v-container>
            <v-container>
                <v-card tile>
                    <v-card-title>Мои мысли</v-card-title>
                    <v-card-text>{{note.myThoughts.description}}</v-card-text>
                </v-card>
            </v-container>
            <v-container>
                <v-card tile>
                    <v-card-title>Противоположные мысли</v-card-title>
                    <v-card-text>{{note.oppositeThoughts.description}}</v-card-text>
                </v-card>
            </v-container>
            <v-container>
                <v-row>
                    <v-col class="text-center">
                        <approve-dialog text="Удалить запись?"
                                        :accept-callback="deleteNote">
                            <btn :loading="isDeleting"
                                 type="cancel">
                                <v-icon>mdi-delete</v-icon>
                            </btn>
                        </approve-dialog>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        <v-skeleton-loader v-else
                           type="card">
        </v-skeleton-loader>
    </v-card>
</template>

<script>
    import Toolbar from "../../util/Toolbar";
    import NoteService from "../../../service/NoteService";
    import ApproveDialog from "../../util/ApproveDialog";
    import Btn from "../../util/Btn";

    export default {
        name: "Note",
        components: {Btn, ApproveDialog, Toolbar},
        data: () => ({
            note: {},
            isLoading: false,
            isDeleting: false
        }),

        computed: {
            username() {
                return this.$store.state.currentUser.username;
            },
            noteId() {
                return this.$route.params.noteId;
            }
        },

        async created() {
            try {
                this.isLoading = true;
                this.note = await NoteService.getNoteByUsernameAndNoteId(this.username, this.noteId);
                this.isLoading = false;
            } catch (e) {
                this.$showSnackbar("error", "Ошибка загрузки записи")
            }
        },

        methods: {

            async deleteNote() {
                try {
                    this.isDeleting = true;
                    await NoteService.deleteNote(this.username, this.noteId);
                    this.isDeleting = false;
                    this.$showSnackbar("success", "Запись успешно удалена")
                    await this.$router.push({name: "ClientDiary"})
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка удаления записи")
                }
            }
        }
    }
</script>

<style scoped>

</style>