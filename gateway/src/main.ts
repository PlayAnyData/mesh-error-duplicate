/* eslint-disable simple-import-sort/imports */
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { createBuiltMeshHTTPHandler } from '../.mesh';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: false,
    }
  );

  const config = app.get<ConfigService>(ConfigService);

  app.use('/graphql', createBuiltMeshHTTPHandler());

  const port = config.get('HTTP_PORT');

  await app.listen(port, '0.0.0.0');
  process.env.NODE_ENV === 'development' &&
    console.log('App running on PORT:' + port);
}

bootstrap();
