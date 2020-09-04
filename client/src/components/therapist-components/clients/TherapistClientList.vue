<template>
    <v-card flat>
        <toolbar title="Мои клиенты"></toolbar>
        <v-skeleton-loader v-if="isLoading"
                           type="list-item-three-line">
        </v-skeleton-loader>
        <v-container class="pb-0 mb-0" v-if="!isLoading">
            <v-list>
                <template v-if="clients.length > 0" v-for="client in clients">

                    <v-row v-if="client.status === 'ACCEPT'"
                           :key="client.username"
                           class="pa-0 ma-0">

                        <v-col class="pa-0 ma-0" cols="10">
                            <v-list-item :to="`/therapist/clients/${client.username}/diary/`">
                                <v-list-item-content>
                                    {{client.username}}
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col class="pa-0 ma-0 text-right">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon class="mt-3"
                                            v-bind="attrs"
                                            v-on="on">
                                        mdi-chevron-down
                                    </v-icon>

                                </template>

                                <v-list class="pa-0 ma-0">
                                    <v-list-item @click="() => sendDeclineAccessRequest(client.username)">
                                        <v-list-item-content>
                                            <v-list-item-title>Удалить</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>

                    <v-row v-if="client.status === 'PENDING'"
                           class="pa-0 ma-0"
                           :key="client.username">
                        <v-col class="pa-0 ma-0" cols="6">
                            <v-list-item disabled>
                                <v-list-item-content>
                                    {{client.username}}
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col class="text-right">
                            <btn class="mr-3"
                                 type="cancel"
                                 @click="() => sendDeclineAccessRequest(client.username)"
                                 fab
                                 x-small>
                                <v-icon>mdi-cancel</v-icon>
                            </btn>
                            <btn type="primary"
                                 @click="() => sendAcceptAccessRequest(client.username)"
                                 fab
                                 dark
                                 x-small>
                                <v-icon>mdi-check</v-icon>
                            </btn>
                        </v-col>
                    </v-row>


                    <v-divider :key="client.username + 'divider'"></v-divider>
                </template>
                <v-list-item v-if="clients.length === 0">
                    <v-list-item-content>
                        У вас пока нет клиентов
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </v-card>
</template>

<script>
    import Toolbar from "../../util/Toolbar";
    import AccessService from "../../../service/access/AccessService";
    import Btn from "../../util/Btn";
    import AccessStatuses from "../../../service/access/AccessStatuses";

    export default {
        name: "TherapistClientList",
        components: {Btn, Toolbar},

        data() {
            return {
                isLoading: false,
                clients: []
            }
        },

        async created() {
            try {
                this.isLoading = true;
                this.clients = await AccessService.getCurrentUserAccesses();
            } catch (e) {
                this.$showSnackbar("error", "Ошибка загрузки информации о клиентах")
            } finally {
                this.isLoading = false;
            }
        },

        methods: {
            async sendAcceptAccessRequest(clientUsername) {
                try {
                    this.isLoading = true;
                    await AccessService.createAccessRequest({
                        username: clientUsername,
                        status: AccessStatuses.ACCEPT
                    })
                    this.$showSnackbar("success", "Запрос успешно принят.")
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка отправки запроса")
                }

                try {
                    await this.loadCurrentUserAccesses();
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка загрузки информации о клиентах")
                } finally {
                    this.isLoading = false;
                }
            },

            async sendDeclineAccessRequest(clientUsername) {
                try {
                    this.isLoading = true;
                    await AccessService.createAccessRequest({
                        username: clientUsername,
                        status: AccessStatuses.DECLINE
                    })
                    this.$showSnackbar("success", "Запрос успешно отклонен.")
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка отправки запроса")
                }

                try {
                    await this.loadCurrentUserAccesses();
                } catch (e) {
                    this.$showSnackbar("error", "Ошибка загрузки информации о клиентах")
                } finally {
                    this.isLoading = false;
                }
            },

            async loadCurrentUserAccesses() {
                const accesses = await AccessService.getCurrentUserAccesses();
                this.$store.commit('setAccesses', accesses);
                this.clients = accesses;
            },
        }
    }
</script>

<style scoped>

</style>