const tokenClient = require('../../client/TokenClient')
const redisClient = require('../RedisClient')

const RedisTokenStorage = {
    TOKEN_NOT_FOUND: {message: "Token not found"},

    async put(sessionId, tokenContainer) {
        await redisClient.setAsync(sessionId, JSON.stringify(tokenContainer), () => {
            console.log("lol")
        });
    },

    async get(sessionId) {
        let tokenString = await redisClient.getAsync(sessionId);
        validateToken(tokenString)
        return JSON.parse(tokenString);
    },

    async remove(sessionId) {
        await redisClient.delAsync(sessionId);
    },

    async refresh(sessionId) {
        let tokenString = await redisClient.getAsync(sessionId);
        validateToken(tokenString)
        let token = JSON.parse(tokenString);
        let newToken = await tokenClient.getTokenByRefreshToken(token.refresh_token);
        console.debug("Token refreshed")
        await redisClient.setAsync(sessionId, JSON.stringify(newToken));
    }
};

function validateToken(token) {
    if (!token) {
        throw RedisTokenStorage.TOKEN_NOT_FOUND
    }
}

module.exports = RedisTokenStorage;