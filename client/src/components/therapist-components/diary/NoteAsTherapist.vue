<template>
    <v-card flat>
        <toolbar back-btn title="Запись"></toolbar>
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
        </v-container>
        <v-skeleton-loader v-else
                           type="card">
        </v-skeleton-loader>
    </v-card>
</template>

<script>
    import Toolbar from "../../util/Toolbar";
    import NoteService from "../../../service/NoteService";
    import Btn from "../../util/Btn";

    export default {
        name: "NoteAsTherapist",
        components: {Btn, Toolbar},
        data: () => ({
            note: {},
            isLoading: false,
            isDeleting: false
        }),

        computed: {
            username() {
                return this.$route.params.username;
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

        }
    }
</script>

<style scoped>

</style>