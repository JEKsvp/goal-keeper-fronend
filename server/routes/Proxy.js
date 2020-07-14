const router = require('express').Router();
const backendClient = require('../client/BackendClient')

router.all('/api/*', async (req, res) => {
    await backendClient.sendRequest(req, res);
});


module.exports = router