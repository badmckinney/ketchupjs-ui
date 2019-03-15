const express = require('express');
const router = express.Router();
const Client = require('../../../database/models/Client');
const Event = require('../../../database/models/Event');

/************************
 *  GET
 ************************/

router.get('/dashboard', (req, res) => {
  const id = req.user.id;

  Client.where('id', id)
    .fetch()
    .then(client => {
      if (!client) { res.status(400).json({ error: 'That account does not exist' }); }
      res.json(client);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}); 