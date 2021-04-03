import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpires: process.env.JWT_EXPIRES,
  passwordResetTTL: process.env.PASSWORD_RESET_TTL,
}));
