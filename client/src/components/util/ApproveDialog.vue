<template>
    <v-dialog :disabled="disabled" v-model="show">

        <template v-slot:activator="{ on }">
            <div style="display: inline;" v-on="on">
                <slot></slot>
            </div>
        </template>

        <v-card outlined>
            <v-card-text
                    class="mt-5 subtitle-1">
                {{text}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error"
                       dark
                       small
                       @click="cancel">
                    Отмена
                </v-btn>
                <v-btn color="teal lighten-2"
                       small
                       dark
                       :loading="isLoading"
                       @click="accept">
                    Принять
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                default: "Внимание!"
            },
            text: {
                type: String
            },
            acceptCallback: {
                type: Function
            },
            cancelCallback: {
                type: Function
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                show: false,
                isLoading: false
            }
        },

        methods: {
            async accept() {
                if (this.acceptCallback) {
                    this.isLoading = true;
                    await this.acceptCallback();
                    this.isLoading = false;
                }
                this.show = false;
            },

            async cancel() {
                if (this.cancelCallback) {
                    await this.cancelCallback();
                }
                this.show = false;
            },

            close() {
                this.show = false;
            }
        }
    }

</script>