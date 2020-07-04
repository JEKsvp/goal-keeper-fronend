const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const backendUrl = require('./BackendUrl');


const app = express();

const port = process.env.PORT || 5000;


app.use('/api', proxy(backendUrl));
app.use('/api/v1/signup', proxy(backendUrl));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(require('./routes/auth'));


