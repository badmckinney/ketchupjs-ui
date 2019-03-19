const express = require('express');
const router = express.Router();
const Client = require('../../../database/models/Client');
const Event = require('../../../database/models/Event');

const uuidAPIKey = require('uuid-apikey');

/************************
 *  GET
 ************************/

router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.json({});
  }

  const id = req.user.id;

  Client.where('id', id)
    .fetch()
    .then(client => {
      if (!client) { res.status(400).json({ error: 'That account does not exist' }); }
      client = client.attributes;

      if (client.key) {
        client.key = uuidAPIKey.toAPIKey(client.key);
      }

      const data = {
        name: client.name,
        username: client.username,
        key: client.key,
        public: client.public
      }

      res.json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/names', (req, res) => {
  Client.fetchAll({ columns: ['name'] })
    .then(names => res.json({ names: names }))
    .catch(err => res.status(500).json(err));
});

router.get('/feature', (req, res) => {
  Client.fetchAll({ columns: ['id'] })
    .then(ids => {
      ids = ids.models;
      feature = ids.slice(Math.floor(Math.random * ids.length + 1), 1)[0].attributes.id;
      Event.where('client_id', feature)
        .fetchAll({ withRelated: ['client'] })
        .then(events => res.json({ events: events }))
        .catch(err => res.status(500).json(err));
    });
});

router.get('/:client', (req, res) => {
  const client = decodeURIComponent(req.params.client);
  Client.where({ name: client })
    .fetchAll({ withRelated: ['events'] })
    .then(client => res.json({ client: client }))
    .catch(err => res.status(500).json(err));
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

router.put('/key', (req, res) => {
  const id = req.user.id;

  const key = uuidAPIKey.create();

  new Client({ id: id })
    .save({ key: key.uuid })
    .then(() => {
      new Client({ id: id })
        .fetch()
        .then(client => {
          client = client.attributes;

          if (client.key) {
            client.key = uuidAPIKey.toAPIKey(client.key);
          }

          const data = {
            name: client.name,
            username: client.username,
            key: client.key,
            public: client.public
          }

          res.json(data);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    });
});


module.exports = router;
