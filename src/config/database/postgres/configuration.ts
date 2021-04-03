import { registerAs } from '@nestjs/config';

const configuration = {
  development: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  test: {
    type: process.env.TEST_DB_TYPE,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
  },
};

const env = process.env.APP_ENV || 'development';
export default registerAs('postgres', () => configuration[env]);
