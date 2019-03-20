const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

const Client = require('../database/models/Client');

const { auth, data } = require('./routes');

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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((client, done) => {
  return done(null, {
    id: client.id,
    username: client.username
  });
});

passport.deserializeUser((client, done) => {
  new Client({ id: client.id })
    .fetch()
    .then(client => {
      client = client.toJSON();
      return done(null, {
        id: client.id,
        username: client.username
      });
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    return Client.query(qb => {
      qb.whereRaw(`LOWER(username) LIKE ?`, [username]);
    })
      .fetch()
      .then(client => {
        if (client === null) {
          return done(null, false);
        } else {
          client = client.toJSON();
          bcrypt.compare(password, client.password).then(res => {
            if (res) {
              return done(null, client);
            } else {
              return done(null, false);
            }
          });
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);
app.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': 'http://ketchupjs.dev.s3-website-us-west-2.amazonaws.com',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH ,DELETE, OPTIONS'
  });
  next();
});
app.use('/api', auth, data);

app.listen(PORT, () => {
  console.log(`Server is armed and dangerous on: ${PORT}`);
});
