<template>
    <v-card height="100%">
        <v-toolbar color="teal lighten-2"
                   dark tile>
            <v-toolbar-title>
                Дневники
            </v-toolbar-title>
        </v-toolbar>
        <v-container class="pb-0 mb-0">
            <v-list>
                <template v-for="(diary) in diaries">
                    <v-list-item :key="diary.id">
                        <v-list-item-content>{{diary.name}}</v-list-item-content>
                    </v-list-item>
                    <v-divider :key="diary.id + 'divider'"
                    ></v-divider>
                </template>
            </v-list>
        </v-container>
        <v-container class="pt-0 mt-0">
            <v-row>
                <v-col class="text-right">
                    <v-btn dark
                           fab
                           color="teal lighten-2"
                           to="/home/diaries/create">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import DiaryService from "../../service/DiaryService";

    export default {
        name: "Diaries",

        data: () => ({
            diaries: []
        }),

        async created() {
            let user = this.$store.state.currentUser;
            this.diaries = await DiaryService.getDiaries(user.username);
        }
    }
</script>

<style scoped>

</style>