<template>
    <div>
        <v-card tile>
            <v-card-title>
                <p>{{user.username}}</p>
            </v-card-title>
            <v-card-text>
                <p>E-mail: {{user.email}}</p>
            </v-card-text>
        </v-card>

        <v-skeleton-loader v-if="isLoading"
                           type="list-item-three-line">
        </v-skeleton-loader>
        <v-card v-else class="mt-5 pt-5" tile>
            <v-card-title>
                <p>Moй терапевт</p>
            </v-card-title>
            <v-divider></v-divider>
            <v-skeleton-loader v-if="isRequestSending"
                               type="list-item-three-line">
            </v-skeleton-loader>
            <v-card-text v-if="therapist && !isRequestSending">
                <v-list class="pa-0 ma-0">
                    <v-row class="pa-0 ma-0">
                        <v-col class="pa-0 ma-0">
                            <v-list-item class="pa-0 ma-0"
                                         :to="`/home/therapists/${therapist.username}`">
                                {{therapist.firstName}} {{therapist.lastName}}
                            </v-list-item>
                        </v-col>
                        <v-col class="pb-0 ma-0 text-right">
                            <btn type="cancel"
                                 small
                                 @click="sendDeclineAccess">Отказаться от услуг
                            </btn>
                        </v-col>
                    </v-row>
                </v-list>
            </v-card-text>
            <v-card-text v-if="!therapist && !isRequestSending" class="subtitle-1">
                <v-row class="pa-0 ma-0">
                    <v-col cols="8" class="pa-0 ma-0">У вас пока нет терапевта.</v-col>
                    <v-col class="pa-0 ma-0 text-right">
                        <btn type="secondary"
                             to="/home/therapists"
                             small>найти
                        </btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

    import TherapistService from "../../service/TherapistService";
    import AccessService from "../../service/access/AccessService";
    import AccessStatuses from "../../service/access/AccessStatuses";
    import Btn from "../util/Btn";

    export default {
        name: "ClientUserPage",
        components: {Btn},
        props: {
            user: {
                type: Object
            }
        },

        data() {
            return {
                isRequestSending: false,
                isLoading: false,
                therapist: null
            }
        },

        async created() {
            await this.loadTherapist();
        },

        methods: {

            async loadTherapist() {
                const accesses = this.$store.state.accesses
                if (accesses.length > 0) {
                    const therapistUsername = accesses[0].username;
                    try {
                        this.isLoading = true;
                        this.therapist = await TherapistService.getTherapist(therapistUsername);
                    } catch (e) {
                        this.$showSnackbar('error', "Ошибка загрузки информации о терапевте")
                    } finally {
                        this.isLoading = false;
                    }
                } else {
                    this.therapist = null;
                }
            },

            async sendDeclineAccess() {
                try {
                    this.isRequestSending = true;
                    await AccessService.createAccessRequest({
                        username: this.therapist.username,
                        status: AccessStatuses.DECLINE
                    })
                    this.$showSnackbar("success", "Запрос успешно отправлен")
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка отправки запроса")
                    this.isRequestSending = false;
                }

                try {
                    await this.loadCurrentUserAccesses();
                    await this.loadTherapist();

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