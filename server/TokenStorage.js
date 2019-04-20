var userTokenMap = new Map();

var TokenStorage = {
    put(username, tokens) {
        userTokenMap.set(username, tokens);
    },

    get(username) {
        return userTokenMap.get(username);
    },

    remove(username) {
        userTokenMap.delete(username);
    },
};

module.exports = TokenStorage;
