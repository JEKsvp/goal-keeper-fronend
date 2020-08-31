<template>
    <v-card flat>
        <toolbar title="Профиль Терапевта" back-btn></toolbar>
        <v-container>
            <v-skeleton-loader v-if="isLoading"
                               type="list-item-three-line">
            </v-skeleton-loader>
            <v-card tile v-if="!isLoading">
                <v-card-text>
                    <p>Имя пользователя: {{therapist.username}}</p>
                    <p>Имя: {{therapist.firstName}}</p>
                    <p>Фамилия: {{therapist.lastName}}</p>
                    <p>Обо мне: {{therapist.aboutMe}}</p>
                </v-card-text>
            </v-card>
        </v-container>
    </v-card>
</template>

<script>

    import Toolbar from "../util/Toolbar";
    import TherapistService from "../../service/TherapistService";

    export default {
        name: "TherapistPage",
        components: {Toolbar},
        data() {
            return {
                isLoading: false,
                therapist: {

                }
            }
        },

        async created() {
            let username = this.$route.params.username;
            try {
                this.isLoading = true;
                this.therapist = await TherapistService.getTherapist(username);
                this.isLoading = false;
            } catch (e) {
                this.$showSnackbar("error", "Ошибка загрузки информации о терапевте.")
            }
        }
    }
</script>

<style scoped>

</style>