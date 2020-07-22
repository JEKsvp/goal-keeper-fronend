const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public/dist'));
app.use(bodyParser.json());
app.use(cookieParser())
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(require('./routes/AuthRouter'));
app.use(require('./routes/Proxy'));


