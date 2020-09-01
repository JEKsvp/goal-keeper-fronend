<template>
    <v-btn @click="click"
           :dark="dark"
           :color="getColor"
           :large="large"
           :to="to"
           :fab="fab"
           :text="text"
           :x-small="xSmall"
           :loading="loading"
           :small="small"
           :disabled="disabled"
           :elevation="elevation"
           :outlined="getOutlined">
        <slot></slot>
    </v-btn>
</template>

<script>

    import Colors from '../../util/Colors'

    const BTN_TYPE = new Map([
        ['primary', {color: Colors.BTN.PRIMARY, outlined: false}],
        ['secondary', {color: Colors.BTN.SECONDARY, outlined: true}],
        ['cancel', {color: Colors.BTN.CANCEL, outlined: true}]
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
            type: {
                type: String,
                default: 'primary'
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
            },
            small: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            elevation: {
                type: [Number, String]
            }
        },

        computed: {
            getColor() {
                const style = BTN_TYPE.get(this.type)
                if (!style) {
                    throw 'style-type not found'
                }
                return style.color;
            },
            getOutlined() {
                const style = BTN_TYPE.get(this.type)
                if (!style) {
                    throw 'style-type not found'
                }
                return style.outlined;
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