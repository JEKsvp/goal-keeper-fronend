const express = require('express');
const axios = require('axios');
const qs = require('qs');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT || 5000;
const backendUrl = process.env.PORT || 'http://localhost:8081';

app.use('/api', proxy(backendUrl));
app.use('/register', proxy(backendUrl));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Server started on port ${port}`));

app.post('/login', async (request, response) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic Y2xpZW50aWQ6c2VjcmV0'
    };
    const requestBody = {
        'grant_type': 'password',
        'username': request.body.username,
        'password': request.body.password
    };
    try {
        let token = await axios.post(`${backendUrl}/oauth/token`, qs.stringify(requestBody), {headers: headers});
        response.json(token.data);
    } catch (e) {
        console.log(e);
    }
});