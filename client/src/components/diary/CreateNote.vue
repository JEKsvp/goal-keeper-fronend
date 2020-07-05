<template>
    <v-card flat>
        <toolbar title="Новая запись"></toolbar>
        <v-form ref="createNoteForm">
            <v-container>
                <v-row>
                    <v-col offset="1"
                           cols="10"
                           class="text-center mb-0 pb-0">
                        <v-textarea
                                validate-on-blur
                                rows="2"
                                label="Событие"
                                placeholder=" "
                                v-model="createNoteRequest.event.description"
                                :rules="[v => notEmptyRule(v)]">
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col offset="1"
                           cols="10"
                           class="text-center mb-0 pb-0">
                        <v-textarea
                                validate-on-blur
                                rows="2"
                                label="Эмоциональная оценка"
                                placeholder=" "
                                v-model="createNoteRequest.emotionalEvaluation.description"
                                :rules="[v => notEmptyRule(v)]">
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col offset="1"
                           cols="10"
                           class="text-center mb-0 pb-0">
                        <v-textarea
                                validate-on-blur
                                rows="2"
                                label="Реакция тела"
                                placeholder=" "
                                v-model="createNoteRequest.bodyReaction.description"
                                :rules="[v => notEmptyRule(v)]">
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col offset="1"
                           cols="10"
                           class="text-center mb-0 pb-0">
                        <v-textarea
                                validate-on-blur
                                rows="3"
                                label="Мои мысли"
                                placeholder=" "
                                v-model="createNoteRequest.myThoughts.description"
                                :rules="[v => notEmptyRule(v)]">
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col offset="1"
                           cols="10"
                           class="text-center mb-0 pb-0">
                        <v-textarea
                                validate-on-blur
                                rows="3"
                                label="Противоположные мысли"
                                placeholder=" "
                                v-model="createNoteRequest.oppositeThoughts.description"
                                :rules="[v => notEmptyRule(v)]">
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-right" cols="11">
                        <v-btn @click="createNote"
                               fab
                               dark
                               color="teal lighten-2">
                            <v-icon>mdi-content-save</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
    import Toolbar from "../util/Toolbar";
    import NoteService from "../../service/NoteService";
    import ValidationService from "../../service/ValidationService";

    export default {
        name: "CreateNote",
        components: {Toolbar},
        data: () => ({
            createNoteRequest: {
                event: {
                    description: null
                },
                emotionalEvaluation: {
                    description: null
                },
                bodyReaction: {
                    description: null
                },
                myThoughts: {
                    description: null
                },
                oppositeThoughts: {
                    description: null
                }
            }
        }),

        computed: {
            username() {
                return this.$route.params.username;
            }
        },

        methods: {
            async createNote() {
                try {
                    this.validate();
                } catch (e) {
                    this.$showSnackbar('error', e);
                    return;
                }
                try {
                    await NoteService.createNote(this.username, this.createNoteRequest);
                    this.$router.push(`/home/users/${this.username}/diary/`)
                } catch (e) {
                    this.$showSnackbar('error', "Ошибка сохранения записи")
                }
            },

            notEmptyRule(v) {
                return !!v || "Обязательное поле должно быть заполнено!"
            },

            validate() {
                this.$refs.createNoteForm.validate();
                ValidationService.validate([
                        ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.event.description),
                        ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.emotionalEvaluation.description),
                        ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.bodyReaction.description),
                        ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.myThoughts.description),
                        ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.oppositeThoughts.description),
                    ]
                )
            },
        }
    }
</script>

<style scoped>

</style>