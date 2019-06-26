// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: 'mydb.c1q5yegvzpfj.us-east-1.rds.amazonaws.com',
      database: 'polling',
      user:     'root',
      password: 'toxiickilla'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: 'mydb.c1q5yegvzpfj.us-east-1.rds.amazonaws.com',
      database: 'polling',
      user:     'root',
      password: 'toxiickilla'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: 'mydb.c1q5yegvzpfj.us-east-1.rds.amazonaws.com',
      database: 'polling',
      user:     'root',
      password: 'toxiickilla'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
