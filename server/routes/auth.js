const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const uuidAPIKey = require('uuid-apikey');

const Client = require('../../database/models/Client');

const saltRounds = 12;

router.post('/register', (req, res) => {
  const newClient = req.body;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      res.status(500).json(err);
    }

    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) {
        res.status(500).json(err);
      }

      const key = uuidAPIKey.create();

      return new Client({
        key: key.uuid,
        name: newClient.name,
        username: newClient.username,
        password: hash
      })
        .save()
        .then(() => {
          return res.json({ apiKey: key.apiKey });
        })
        .catch(err => {
          return res.json(500).json(err);
        });
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, username: req.user.username });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.send({ success: true });
});

module.exports = router;