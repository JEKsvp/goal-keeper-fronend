const router = require('express').Router();
const backendClient = require('../client/BackendClient')

router.all('/api/*', async (req, res) => {
    try {
        const proxyResp = await backendClient.sendRequest(req);
        res.status(proxyResp.status).send(proxyResp.data)
    } catch (e) {
        await backendClient.handleProxyError(req, res, e, true)
    }
});


module.exports = router