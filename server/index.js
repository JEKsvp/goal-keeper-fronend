const express =  require('express');
const proxy = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT || 5000;

const backendUrl = 'http://localhost:8081'
app.use('/api', proxy(backendUrl));
app.listen(port, () => console.log(`Server started on port ${port}`));