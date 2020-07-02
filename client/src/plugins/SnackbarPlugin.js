export default {
    install(Vue) {
        Vue.prototype.$showSnackbar = function (color, text) {
            const snackbarComponent = findSnackbarPlugin(this)

            snackbarComponent.$data.show = true;
            snackbarComponent.$data.color = color || '';
            snackbarComponent.$data.text = text || '';
        };
    },
};

function findSnackbarPlugin(vue) {
    if(!vue){
        throw 'snackbarPlugin not found'
    }
    if(vue.$refs.snackbarPlugin){
        return vue.$refs.snackbarPlugin
    }
    return findSnackbarPlugin(vue.$parent)
}