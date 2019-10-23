import * as Joi from 'joi';

export const env: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid([
      'dev',
      'prod',
    ])
    .default('dev')
    .required(),
  APP_HOST: Joi.any()
    .required(),
  APP_PORT: Joi.number()
    .required(),
  REDIS_HOST: Joi.any()
    .required(),
  REDIS_PORT: Joi.number()
    .required(),
  REDIS_MAX_CLI: Joi.number()
    .required(),
  CACHE_TTL: Joi.number()
    .required(),
  CACHE_MAX: Joi.number()
    .required(),
});

export default env;
