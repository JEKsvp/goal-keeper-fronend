const tokenClient = require('../../client/TokenClient')

const sessionTokenMap = new Map();

const LocalTokenStorage = {
    TOKEN_NOT_FOUND: {message: "Token not found"},

    put(sessionId, tokenContainer) {
        sessionTokenMap.set(sessionId, tokenContainer);
    },

    get(sessionId) {
        let token = sessionTokenMap.get(sessionId);
        if (!token) {
            throw this.TOKEN_NOT_FOUND
        }
        return token;
    },

    remove(sessionId) {
        sessionTokenMap.delete(sessionId);
    },

    async refresh(sessionId) {
        let token = sessionTokenMap.get(sessionId);
        if (!token) {
            throw this.TOKEN_NOT_FOUND
        }
        let newToken = await tokenClient.getTokenByRefreshToken(token.refresh_token);
        console.debug("Token refreshed")
        sessionTokenMap.set(sessionId, newToken);
    }
};

module.exports = LocalTokenStorage;
