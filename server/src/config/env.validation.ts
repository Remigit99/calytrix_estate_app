import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  CLIENT_URL: Joi.string().uri().default('http://localhost:5173'),

  DATABASE_URL: Joi.string().required(),

  DATABASE_URL_UNPOOLED: Joi.string().required(),

  JWT_ACCESS_SECRET: Joi.string().min(32).required(),

  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),

  JWT_REFRESH_EXPIRES_IN_DAYS: Joi.number().integer().min(1).max(30).default(7),
});
