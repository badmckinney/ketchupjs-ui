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
    .orderBy('name')
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
  knex.raw(`Select events.user_name, events.metric, count(events.metric), events.client_id, clients.name, max(events.created_at) FROM events INNER JOIN clients ON events.client_id = clients.id WHERE events.public = true OR client_id = ${req.user.id} GROUP BY events.user_name, events.metric, events.client_id, clients.name ORDER BY max DESC LIMIT 20`)
    .then(events => {
      res.json({ events: events.rows })
    })
    .catch(err => {
      console.log(err);

      return res.status(500).json(err)
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
      let clientData = [client.attributes];
      id = client.attributes.id;
      knex.raw(`Select metric FROM events WHERE client_id = ${feature} GROUP BY metric`)
        .then(metrics => {
          clientSet[0].metrics = metrics.rows;
          clientData[0].users = [];
          let promises = [];
          knex.raw(`Select user_name FROM events WHERE client_id = ${id} GROUP BY user_name`)
            .then(users => {
              users.rows.map(user => {
                promises.push(knex.raw(`SELECT sum(value) AS value, metric FROM events WHERE client_id = ${id} AND user_name = '${user.user_name}' GROUP BY metric`)
                  .then(events => {
                    user.events = events.rows
                    clientData[0].users.push(user);
                  }))
              })
            })
        })
        .then(() => {
          Promise.all(promises).then(() => {
            return res.json({ clients: clientData })
          })
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
