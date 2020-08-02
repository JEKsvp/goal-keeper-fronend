<template>
    <v-btn @click="click"
           :dark="dark"
           :color="innerColor"
           :large="large"
           :to="to"
           :fab="fab"
           :text="text"
           :x-small="xSmall">
        <slot></slot>
    </v-btn>
</template>

<script>
    const BTN_TYPE = new Map([
        ['accept', '#b5b5b5'],
        ['create', '#b5b5b5'],
        ['cancel', '#d96662']
    ])


    export default {
        name: "Btn",
        props: {
            dark: {
                type: Boolean,
                default: true
            },
            to: {
                type: String
            },
            large: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: 'accept'
            },
            fab: {
                type: Boolean,
                default: false
            },
            text: {
                type: Boolean,
                default: false
            },
            xSmall: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            innerColor() {
                return BTN_TYPE.get(this.color) || this.color
            }
        },

        methods: {
            click() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>

</style>