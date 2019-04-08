const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { databaseUrl } = require('./config');
const { authentication } = require('./middlewares');
const handlers = require('./handlers');
const app = express();

mongoose.connect(databaseUrl, { autoReconnect: true, useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', handlers.greeting);

app.post('/register', handlers.register);
app.post('/login', handlers.login);

app.use(authentication);

app.get('/music', handlers.searchMusic);

app.listen(8000, () => console.log('App listening on port 8000!'));
