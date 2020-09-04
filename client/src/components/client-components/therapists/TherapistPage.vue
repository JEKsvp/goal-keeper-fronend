<template>
    <v-card flat>
        <toolbar title="Профиль Терапевта" back-btn></toolbar>
        <v-container>
            <v-skeleton-loader v-if="isLoading"
                               type="list-item-three-line">
            </v-skeleton-loader>
            <v-card tile v-if="!isLoading">
                <v-card-title>
                    <p>{{therapist.firstName}} {{therapist.lastName}} ({{therapist.username}})</p>
                </v-card-title>
                <v-card-subtitle class="subtitle-1 font-weight-bold">Обо мне:</v-card-subtitle>
                <v-card-text>
                    <p>{{therapist.aboutMe}}</p>
                </v-card-text>
                <v-divider v-if="isClient"></v-divider>
                <v-card-actions v-if="isClient">
                    <v-row class="pa-0 ma-0">
                        <v-col class="pa-0 ma-0 text-right">
                            <btn v-if="!clientAlreadyHasTherapist"
                                 type="secondary"
                                 @click="sendAccessRequest"
                                 :loading="isRequestSending">
                                Стать клиентом
                            </btn>
                            <btn v-if="clientAlreadyHasTherapist" type="secondary"
                                 @click="sendAccessRequest"
                                 :loading="isRequestSending"
                                 light
                                 :disabled="true">
                                У вас уже есть терапевт
                            </btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-card>
</template>

<script>

    import Toolbar from "../../util/Toolbar";
    import TherapistService from "../../../service/TherapistService";
    import AccessService from "../../../service/access/AccessService";
    import AccessStatuses from "../../../service/access/AccessStatuses";
    import Btn from "../../util/Btn";
    import Roles from "../../../util/Roles";

    export default {
        name: "TherapistPage",
        components: {Btn, Toolbar},
        data() {
            return {
                isLoading: false,
                isRequestSending: false,
                therapist: {}
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
        },

        computed: {
            isClient() {
                return this.$store.state.currentUser.roles.includes(Roles.CLIENT)
            },

            isTherapist() {
                return this.$store.state.currentUser.roles.includes(Roles.THERAPIST)
            },

            clientAlreadyHasTherapist() {
                const accesses = this.$store.state.accesses
                return accesses.length > 0
            },
        },

        methods: {
            async sendAccessRequest() {
                try {
                    this.isRequestSending = true;
                    await AccessService.createAccessRequest({
                        username: this.therapist.username,
                        status: AccessStatuses.PENDING
                    })
                    this.$showSnackbar("success", "Запрос успешно отправлен. Статус можно посмотреть на странице вашего профиля", 7000)
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка отправки запроса")
                }

                try {
                    await this.loadCurrentUserAccesses();
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка загрузки информации о терапевте")
                } finally {
                    this.isRequestSending = false;
                }
            },

            async loadCurrentUserAccesses() {
                const accesses = await AccessService.getCurrentUserAccesses();
                this.$store.commit('setAccesses', accesses);
            },
        }
    }
</script>

<style scoped>

</style>