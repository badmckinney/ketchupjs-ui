const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);

const PORT = process.env.EXPRESS_CONTAINER_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET || 'mudkip';
const REDIS_URL = `${process.env.REDIS_URL}:${process.env.REDIS_HOST_PORT}`;
const ENV = process.env.NODE_ENV || 'development';

if (!PORT) {
  throw new Error('PORT not set');
}

if (!ENV) {
  throw new Error('ENV not set');
}

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET not set');
}

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    store: new redis({
      url: REDIS_URL,
      logErrors: true
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.listen(PORT, () => {
  console.log(`Server is armed and dangerous on: ${PORT}`);
})