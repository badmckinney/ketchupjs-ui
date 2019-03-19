const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const uuidAPIKey = require('uuid-apikey');

const Client = require('../../../database/models/Client');

const saltRounds = 12;

router.post('/auth/register', (req, res) => {
  const newClient = req.body;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.status(500).json(err);
    }

    bcrypt.hash(newClient.password, salt, function (err, hash) {
      if (err) {
        return res.status(500).json(err);
      }

      const key = uuidAPIKey.create();

      return new Client({
        name: newClient.name,
        username: newClient.username,
        password: hash,
        key: key.uuid
      })
        .save()
        .then(() => {
          return res.json({ success: true, apiKey: key.apiKey });
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    });
  });
});

router.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, username: req.user.username });
});

router.post('/auth/logout', (req, res) => {
  req.logout();
  res.send({ success: true });
});

module.exports = router;