const bookshelf = require('./bookshelf');
const Event = require('./Event');

class Client extends bookshelf.Model {
  get tableName() { return 'clients'; }
  get hasTimestamps() { return true; }
  events() { return this.hasMany('Event', 'events'); }
}

module.exports = bookshelf.model('Client', Client);