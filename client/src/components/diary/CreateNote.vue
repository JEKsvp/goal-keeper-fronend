<template>
    <v-card flat>
        <toolbar title="Новая запись"></toolbar>
        <v-form ref="createNoteForm">
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step :step="1"
                                    editable>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :step="2"
                                    editable>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :step="3"
                                    editable>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :step="4"
                                    editable>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :step="5"
                                    editable>
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content :step="1">
                        <v-card flat>
                            <v-card-title>Событие</v-card-title>
                            <v-card-text>
                                <v-textarea validate-on-blur
                                            rows="4"
                                            placeholder=" "
                                            v-model="createNoteRequest.event.description"
                                            :rules="[v => notEmptyRule(v)]">
                                </v-textarea>
                            </v-card-text>
                            <v-card-actions class="pa-0 ma-0 text-center">
                                <v-row class="ma-0 pa-0">
                                    <v-col class="text-right ma-0 pa-0">
                                        <btn type="secondary" small fab @click="nextStep">
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content :step="2">
                        <v-card flat>
                            <v-card-title>Эмоциональная оценка</v-card-title>
                            <v-card-text>
                                <v-textarea validate-on-blur
                                            rows="4"
                                            placeholder=" "
                                            v-model="createNoteRequest.emotionalEvaluation.description"
                                            :rules="[v => notEmptyRule(v)]">
                                </v-textarea>
                            </v-card-text>
                            <v-card-actions class="pa-0 ma-0 text-center">
                                <v-row class="ma-0 pa-0">
                                    <v-col class="text-left ma-0 pa-0">
                                        <btn type="secondary" small fab @click="previousStep">
                                            <v-icon>mdi-chevron-left</v-icon>
                                        </btn>
                                    </v-col>
                                    <v-col class="text-right ma-0 pa-0">
                                        <btn type="secondary" small fab @click="nextStep">
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>

                    </v-stepper-content>
                    <v-stepper-content :step="3">
                        <v-card flat>
                            <v-card-title>Реакция тела</v-card-title>
                            <v-card-text>
                                <v-textarea validate-on-blur
                                            rows="4"
                                            placeholder=" "
                                            v-model="createNoteRequest.bodyReaction.description"
                                            :rules="[v => notEmptyRule(v)]">
                                </v-textarea>
                            </v-card-text>
                            <v-card-actions class="pa-0 ma-0 text-center">
                                <v-row class="ma-0 pa-0">
                                    <v-col class="text-left ma-0 pa-0">
                                        <btn type="secondary" small fab @click="previousStep">
                                            <v-icon>mdi-chevron-left</v-icon>
                                        </btn>
                                    </v-col>
                                    <v-col class="text-right ma-0 pa-0">
                                        <btn type="secondary" small fab @click="nextStep">
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content :step="4">
                        <v-card flat>
                            <v-card-title>Мои мысли</v-card-title>
                            <v-card-text>
                                <v-textarea
                                        validate-on-blur
                                        rows="4"
                                        placeholder=" "
                                        v-model="createNoteRequest.myThoughts.description"
                                        :rules="[v => notEmptyRule(v)]">
                                </v-textarea>
                            </v-card-text>
                            <v-card-actions class="pa-0 ma-0 text-center">
                                <v-row class="ma-0 pa-0">
                                    <v-col class="text-left ma-0 pa-0">
                                        <btn type="secondary" small fab @click="previousStep">
                                            <v-icon>mdi-chevron-left</v-icon>
                                        </btn>
                                    </v-col>
                                    <v-col class="text-right ma-0 pa-0">
                                        <btn type="secondary" small fab @click="nextStep">
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content :step="5">
                        <v-card flat>
                            <v-card-title>Противоположные мысли</v-card-title>
                            <v-card-text>
                                <v-textarea validate-on-blur
                                            rows="4"
                                            placeholder=" "
                                            v-model="createNoteRequest.oppositeThoughts.description"
                                            :rules="[v => notEmptyRule(v)]">
                                </v-textarea>
                            </v-card-text>
                            <v-card-actions class="pa-0 ma-0 text-center">
                                <v-row class="ma-0 pa-0">
                                    <v-col class="text-left ma-0 pa-0">
                                        <btn type="secondary" small fab @click="previousStep">
                                            <v-icon>mdi-chevron-left</v-icon>
                                        </btn>
                                    </v-col>
                                    <v-col class="text-right ma-0 pa-0">
                                        <btn type="primary"
                                             small
                                             fab
                                             dark
                                             elevation="0"
                                             @click="createNote">
                                            <v-icon small>mdi-content-save</v-icon>
                                        </btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-form>
    </v-card>
</template>

<script>
    import Toolbar from "../util/Toolbar";
    import NoteService from "../../service/NoteService";
    import ValidationService from "../../service/ValidationService";
    import Btn from "../util/Btn";

    export default {
        name: "CreateNote",
        components: {Btn, Toolbar},
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
            },
            step: 1
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
                    this.goToInvalidStep();
                    return;
                }
                try {
                    await NoteService.createNote(this.username, this.createNoteRequest);
                    this.$router.push(`/home/users/${this.username}/diary/`)
                } catch (e) {
                    this.$showSnackbar('error', "Ошибка сохранения записи")
                }
            },

            goToInvalidStep() {
                this.step = ValidationService.getInvalidParameterNumber(this.getRuleContainers()) + 1;
            },

            notEmptyRule(v) {
                return !!v || "Обязательное поле должно быть заполнено!"
            },

            validate() {
                this.$refs.createNoteForm.validate();
                ValidationService.validate(this.getRuleContainers())
            },

            getRuleContainers() {
                return [
                    ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.event.description),
                    ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.emotionalEvaluation.description),
                    ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.bodyReaction.description),
                    ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.myThoughts.description),
                    ValidationService.ruleContainer(this.notEmptyRule, this.createNoteRequest.oppositeThoughts.description),
                ]
            },

            nextStep() {
                this.step++;
            },

            previousStep() {
                this.step--;
            }
        }
    }
</script>

<style scoped>

</style>