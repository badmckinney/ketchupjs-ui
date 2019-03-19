const express = require('express');
const knex = require('../../../database/knex');
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
  if (!req.user) {
    req.user = { id: 0 };
  }
  Client.query({ where: { public: true }, orWhere: { id: req.user.id } })
    .fetchAll({ columns: ['name', 'id'] })
    .then(names => res.json({ names: names }))
    .catch(err => {
      return res.status(500).json(err)
    });
});

router.get('/feature', (req, res) => {
  if (!req.user) {
    req.user = { id: 0 };
  }
  Client.query({ where: { public: true }, orWhere: { id: req.user.id } })
    .fetchAll({ columns: ['id'] })
    .then(ids => {
      ids = ids.models;

      feature = ids[Math.floor(Math.random() * ids.length)].attributes.id;
      feature2 = ids[Math.floor(Math.random() * ids.length)].attributes.id;
      while (feature === feature2) {
        feature2 = ids[Math.floor(Math.random() * ids.length)].attributes.id;
      }
      let clientSet = []
      Client.where('id', feature).fetch({ columns: ['name'] })
        .then(client => {
          knex.raw(`SELECT sum(value), metric, user_name FROM events WHERE client_id = ${feature} GROUP BY metric, user_name`)
            .then(events => {
              clientSet.push({ name: client.attributes.name, events: events.rows })
              Client.where('id', feature2).fetch({ columns: ['name'] })
                .then(clientTwo => {
                  knex.raw(`SELECT sum(value), metric, user_name FROM events WHERE client_id = ${feature2} GROUP BY metric, user_name`)
                    .then(eventsTwo => {
                      clientSet.push({ name: clientTwo.attributes.name, events: eventsTwo.rows })
                      return res.json({ clients: clientSet })
                    })
                })
            })
        })
        .catch(err => {
          return res.status(500).json(err)
        });
    });
});

router.get('/:client', (req, res) => {
  if (!req.user) {
    req.user = { id: 0 };
  }
  const client = decodeURIComponent(req.params.client);
  Client.query({ where: { name: client, public: true }, orWhere: { name: client, id: req.user.id } })
    .fetch({ columns: ['name', 'id'] })
    .then(client => {
      if (!client) { return res.json({ error: 'No Records Found' }); }
      id = client.attributes.id;
      knex.raw(`SELECT sum(value), metric, user_name FROM events WHERE client_id = ${id} GROUP BY metric, user_name`)
        .then(events => {
          client.attributes.events = events.rows;
          return res.json({ client: client });
        })
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
