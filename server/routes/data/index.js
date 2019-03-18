const express = require('express');
const router = express.Router();
const Client = require('../../../database/models/Client');
const Event = require('../../../database/models/Event');

/************************
 *  GET
 ************************/

router.get('/profile', (req, res) => {
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

router.get('/names', (req, res) => {
  Client.where('public', true).fetchAll({ columns: ['name', 'id'] })
    .then(names => res.json({ names: names }))
    .catch(err => res.status(500).json(err));
});

router.get('/feature', (req, res) => {
  Client.fetchAll({ columns: ['id'] })
    .then(ids => {
      ids = ids.models;

      feature = ids[Math.floor(Math.random() * ids.length)].attributes.id;
      feature2 = ids[Math.floor(Math.random() * ids.length)].attributes.id;
      while (feature === feature2) {
        feature2 = ids[Math.floor(Math.random() * ids.length)].attributes.id;
      }
      Client.query({ where: { 'id': feature }, orWhere: { 'id': feature2 } })
        .fetchAll({ columns: ['name', 'id'], withRelated: ['events'] })
        .then(clients => res.json({ clients: clients }))
        .catch(err => res.status(500).json(err));
    });
});

router.get('/:client', (req, res) => {
  const client = decodeURIComponent(req.params.client);
  Client.where({ name: client })
    .fetchAll({ columns: ['name', 'id'], withRelated: ['events'] })
    .then(client => {
      return res.json({ client: client })
    })
    .catch(err => {
      return res.status(500).json(err)
    });
});

/************************
 * PUT
 ************************/

router.put('/profile', (req, res) => {
  const id = req.user.id;
  const client = req.body;

  const updatedInfo = {
    name: client.name,
    username: client.username,
    public: client.public
  }

  Client.where('id', id)
    .fetch()
    .then(client => {
      if (!client) { res.status(400).json({ error: 'Account not found' }) }
      if (client.attributes.id !== id) { res.status(400).json({ error: Unauthorized }) }

      client
        .save(updatedInfo, { patch: true })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json(err));
    });
});

module.exports = router;
