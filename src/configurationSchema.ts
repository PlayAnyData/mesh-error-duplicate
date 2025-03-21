import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';


export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
  HTTP_PORT: Joi.number()
  .min(80)
  .max(65535)
  .default(8080)
  .error(() => {
    const e = 'HTTP_PORT must be a valid port between 80 and 65535';
    console.error(e);
    return new Error(e);
  }),
  PATH_TO_SUPERGRAPH: Joi.string().default('./'),
  CATALOG_URL: Joi.string().default('http://localhost:8084'),
  DEBUG: Joi.number().default(0)
})
};
