import Vue from 'vue'
import Snackbar from '../components/util/Snackbar'

export default {
    install(vue) {
        const root = mountSnackbar();
        const snackbarComponent = root.$children[0];
        setDefaultData(snackbarComponent);

        vue.prototype.$showSnackbar = function (color, text) {
            snackbarComponent.$data.show = true;
            snackbarComponent.$data.color = color;
            snackbarComponent.$data.text = text;
        };
    },
};

function setDefaultData(component) {
    const map = getDefaultData();
    map.forEach((value, key) => component.$data[key] = value);
}

function getDefaultData() {
    const map = new Map();
    map.set('show', false);
    map.set('color', '');
    map.set('text', '');
    return map;
}

function mountSnackbar() {
    const root = new Vue({
        render: createElement => createElement(Snackbar)
    });
    let div = document.createElement('div');
    div.setAttribute('id', 'snackbar-plugin');
    document.querySelector('body').appendChild(div);
    root.$mount('#snackbar-plugin');
    return root;
}

