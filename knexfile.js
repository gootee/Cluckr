// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cluckr',
      username: 'john',
      password: 'al1son',
    },
    migrations: {
      tableName: 'migrations',
      directory: 'db/migrations',
    },
  },

};
