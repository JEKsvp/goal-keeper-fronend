var userTokenMap = new Map();

var TokenStorage = {
    put(accessToken, refreshToken) {
        userTokenMap.set(accessToken, refreshToken);
    },

    get(accessToken) {
        return userTokenMap.get(accessToken);
    },

    remove(accessToken) {
        userTokenMap.delete(accessToken);
    },
};

module.exports = TokenStorage;
