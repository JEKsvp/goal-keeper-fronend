var router = require('express').Router();
const axios = require('axios');
const qs = require('qs');

const ErrorDto = require('./dto/ErrorDto');
const TokenStorage = require('../TokenStorage');
const backendUrl = require('../BackendUrl');

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic Y2xpZW50aWQ6c2VjcmV0'
};

router.post('/login', async (request, response) => {
    try {
        let tokenResponse = await getTokenByLogin(request.body.username, request.body.password);
        TokenStorage.put(tokenResponse.data.access_token, tokenResponse.data.refresh_token);
        response.json({accessToken: tokenResponse.data.access_token});
    } catch (e) {
        if (e.response.status === 400) {
            response.status(400)
                .json({message: 'invalid login or password'})
        } else {
            response.status(500)
                .json(ErrorDto.internalServerError());
        }
    }
});

async function getTokenByLogin(username, password) {
    const requestBody = {
        'grant_type': 'password',
        'username': username,
        'password': password
    };
    return await axios.post(`${backendUrl}/oauth/token`, qs.stringify(requestBody), {headers: headers});
}

router.post('/refreshToken', async (request, response) => {
    let accessToken = request.body.accessToken;
    let refreshToken = TokenStorage.get(accessToken);
    if (refreshToken) {
        try {
            let tokenResponse = await getTokenByRefreshToken(refreshToken);
            TokenStorage.remove(accessToken);
            TokenStorage.put(tokenResponse.data.access_token, tokenResponse.data.refresh_token);
            response.json({accessToken: tokenResponse.data.access_token});
        } catch (e) {
            console.error(e);
            response.status(500)
                .end(ErrorDto.internalServerError());
        }
    } else {
        response.status(401)
            .json(new ErrorDto('Unauthorized'));
    }
});

async function getTokenByRefreshToken(refreshToken) {
    const requestBody = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    };
    return await axios.post(`${backendUrl}/oauth/token`, qs.stringify(requestBody), {headers: headers});
}

module.exports = router;