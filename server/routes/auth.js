var router = require('express').Router();
const axios = require('axios');
const qs = require('qs');
const TokenStorage = require('../TokenStorage');
const backendUrl = require('../BackendUrl');

router.post('/login', async (request, response) => {
    try {
        let tokenResponse = await getTokenByLogin(request.body.username, request.body.password);
        TokenStorage.put(request.body.username, tokenResponse.data);
        response.json({accessToken: tokenResponse.data.access_token});
    } catch (e) {
        console.error(e);
        response.status(500).end();
    }
});

async function getTokenByLogin(username, password) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic Y2xpZW50aWQ6c2VjcmV0'
    };
    const requestBody = {
        'grant_type': 'password',
        'username': username,
        'password': password
    };
    return await axios.post(`${backendUrl}/oauth/token`, qs.stringify(requestBody), {headers: headers});
}

router.post('/refreshToken', async (request, response) => {
    let username = request.body.username;
    let accessToken = request.body.accessToken;
    let tokens = TokenStorage.get(username);
    if (tokens && tokens.access_token === accessToken) {
        try {
            let tokenResponse = await getTokenByRefreshToken(username, tokens.refresh_token);
            TokenStorage.put(request.body.username, tokenResponse.data);
            response.json({accessToken: tokenResponse.data.access_token});
        } catch (e) {
            console.error(e);
            response.status(500).end();
        }
    } else {
        response.status(401).send('Unauthorized');
    }
});

async function getTokenByRefreshToken(username, refreshToken) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic Y2xpZW50aWQ6c2VjcmV0'
    };
    const requestBody = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    };
    return await axios.post(`${backendUrl}/oauth/token`, qs.stringify(requestBody), {headers: headers});
}

module.exports = router;