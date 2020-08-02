const cookie = require('cookie');

const SESSION_COOKIE_NAME = "SESSIONID"

const SessionService = {

    SESSION_NOT_FOUND: {message: "Session not found"},

    setSession: function (res, sessionId) {
        res.cookie(SESSION_COOKIE_NAME, sessionId)
    },

    extractSessionId: function (req) {
        const headers = req.headers
        if (!headers.cookie) {
            throw this.SESSION_NOT_FOUND
        }
        const cookies = cookie.parse((headers.cookie))
        const sessionId = cookies[SESSION_COOKIE_NAME]
        if (sessionId) {
            return sessionId
        } else {
            throw this.SESSION_NOT_FOUND
        }
    },

    clearSession: function (res) {
        res.clearCookie(SESSION_COOKIE_NAME)
    },
}

module.exports = SessionService