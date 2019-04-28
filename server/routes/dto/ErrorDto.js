module.exports = class ErrorDto {
    constructor(message) {
        this.message = message;
    }

    static internalServerError() {
        return new ErrorDto('Internal server error');
    }
};