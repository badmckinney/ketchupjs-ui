const bookshelf = require('./bookshelf');
const Client = require('./Client');

class Event extends bookshelf.Model {
  get tableName() { return 'events'; }
  get hasTimestamps() { return true; }
  client() { return this.hasOne('Client', 'id', 'client_id'); }
}

module.exports = bookshelf.Model('Event', Event);