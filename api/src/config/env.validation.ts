import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES: Joi.string().default('7d'),
  CORS_ORIGINS: Joi.string().default('http://localhost:4200'),
  COOKIE_SECURE: Joi.boolean().truthy('true').falsy('false').default(false),
});
