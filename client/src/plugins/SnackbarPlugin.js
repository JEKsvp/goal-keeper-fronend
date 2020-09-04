import Colors from "../util/Colors";

export default {
    install(Vue) {
        Vue.prototype.$showSnackbar = function (type, text, timeout = 3000) {
            const snackbarComponent = findSnackbarPlugin(this)

            snackbarComponent.$data.show = true;
            snackbarComponent.$data.color = types.get(type) || '';
            snackbarComponent.$data.text = text || '';
            snackbarComponent.$data.timeout = timeout
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