// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  development: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: ['src/database/subscribers/**/*.ts'],
    seeds: ['src/database/seeders/*.ts'],
    factories: ['src/database/factories/*.ts'],
    cli: {
      entitiesDir: 'src/**/entities',
      migrationsDir: 'src/database/migrations',
      subscribersDir: 'src/database/subscribers',
      factoriesDir: 'src/database/factories',
      seedsDir: 'src/database/seeders',
    },
  },
}[process.env.APP_ENV];
