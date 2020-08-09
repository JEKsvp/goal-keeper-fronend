import Colors from "../util/Colors";

export default {
    install(Vue) {
        Vue.prototype.$showSnackbar = function (type, text) {
            const snackbarComponent = findSnackbarPlugin(this)

            snackbarComponent.$data.show = true;
            snackbarComponent.$data.color = types.get(type) || '';
            snackbarComponent.$data.text = text || '';
        };
    },
};

const types = new Map([
    ['error', Colors.SNACKBAR.ERROR],
    ['success', Colors.SNACKBAR.SUCCESS]
])

function findSnackbarPlugin(vue) {
    if (!vue) {
        throw 'snackbarPlugin not found'
    }
    if (vue.$refs.snackbarPlugin) {
        return vue.$refs.snackbarPlugin
    }
    return findSnackbarPlugin(vue.$parent)
}