require('dotenv').config({ path: './.env' });
module.exports = {
  client: 'pg',
  connection: {
    port: process.env.POSTGRES_HOST_PORT,
    host: process.env.POSTGRES_HOSTNAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: __dirname + '/database/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: __dirname + '/database/seeds'
  }
};
