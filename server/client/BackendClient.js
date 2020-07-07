const backendUrl = require('../env/BackendUrl')
const axios = require('axios')
const tokenStorage = require('../TokenStorage')
const errorBuilder = require('../routes/ErrorBuilder')
const sessionService = require('../service/SessionService')

const sendRequest = async function (req) {
    const sessionId = sessionService.extractSessionId(req)
    const token = tokenStorage.get(sessionId)
    req.headers['Authorization'] = `Bearer ${token.access_token}`
    return axios.request({
        url: `${backendUrl}${req.url}`,
        data: req.body,
        method: req.method,
        params: req.query,
        headers: req.headers
    });
}

const handleBackendError = async function (req, res, e, needRetry) {
    if (e === tokenStorage.TOKEN_NOT_FOUND || e === sessionService.SESSION_NOT_FOUND) {
        errorBuilder.unauthorized(res)
    } else if (e.response && e.response.status === 401) {
        if (needRetry) {
            await retry(req, res)
            return
        }
        errorBuilder.unauthorized(res)
    } else if (e.response && e.response.status === 403) {
        errorBuilder.forbidden(res)
    } else {
        console.error(e)
        errorBuilder.internalServerError(res)
    }
}

async function retry(req, res) {
    try {
        let sessionId = sessionService.extractSessionId(req)
        await tokenStorage.refresh(sessionId)
        const proxyResp = await sendRequest(req)
        res.status(proxyResp.status).send(proxyResp.data)
    } catch (ex) {
        console.error(ex)
        await handleBackendError(req, res, ex, false)
    }
}

module.exports.sendRequest = sendRequest
module.exports.handleProxyError = handleBackendError