<template>
    <v-card height="100%">
        <v-toolbar color="teal lighten-2"
                   dark tile>
            <v-toolbar-title>
                Новый дневник
            </v-toolbar-title>
        </v-toolbar>
        <v-form ref="createDiaryForm">
            <v-container>
                <v-row>
                    <v-col offset="1"
                           cols="10"
                           class="text-center mb-0 pb-0">
                        <v-text-field
                                validate-on-blur
                                label="Имя дневника"
                                placeholder=" "
                                v-model="createDiaryRequest.name"
                                :rules="[v => notEmptyRule(v)]">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-right" cols="11">
                        <v-btn @click="crateDiary"
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
    import DiaryService from "../../service/DiaryService";
    import ValidationService from "../../service/ValidationService";

    export default {
        name: "CreateDiary",

        data: () => ({
            createDiaryRequest: {
                name: null
            }
        }),

        methods: {
            async crateDiary() {
                try {
                    this.validate();
                } catch (e) {
                    this.$showSnackbar('error', e);
                    return;
                }
                try {
                    await DiaryService.createDiary(this.createDiaryRequest);
                    this.$router.push(`/home/diaries/${this.$store.state.currentUser.username}`)
                } catch (e) {
                    this.$showSnackbar('error', "Ошибка сохранения дневника")
                }
            },

            notEmptyRule(v) {
                return !!v || "Обязательное поле должно быть заполнено!"
            },

            validate() {
                this.$refs.createDiaryForm.validate();
                ValidationService.validate([
                        ValidationService.ruleContainer(this.notEmptyRule, this.createDiaryRequest.name),
                    ]
                )
            },
        }
    }
</script>

<style scoped>

</style>