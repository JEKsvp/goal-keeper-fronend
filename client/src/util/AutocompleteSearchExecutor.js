/*
* Class for delayed execution search function for autocomplete
*/
export default class AutocompleteSearchExecutor {


    /*
    * func - function that must be executed after delay
    * */
    constructor(func, delay) {
        this.delay = delay;
        this.lastParam = null;
        this.timeoutFunc = null;
        this.func = func;
    }


    /*param - function parameter*/
    search(param) {
        this.lastParam = param;
        clearTimeout(this.timeoutFunc);
        this.timeoutFunc = setTimeout(() => {
            if (this.lastParam === param) {
                this.func(param);
            }
        }, this.delay);

    }
}