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
                <btn type="primary"
                     dark
                     @click="cancel">
                    Отмена
                </btn>
                <btn type="secondary"
                     :loading="isLoading"
                     @click="accept">
                    Принять
                </btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    import Btn from "./Btn";

    export default {
        components: {Btn},
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