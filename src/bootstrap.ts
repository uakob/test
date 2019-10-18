import {
  NestFactory,
} from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import {
  COMMON_DI_CONSTANTS,
} from './common';
import {
  DI_CONSTANTS,
} from './di_constants';

import {
  AppModule,
} from './modules';

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // {
    //   logger: false,
    // },
  );
  try {
    await app
      .select(AppModule)
      .get(DI_CONSTANTS.IAppService)
      .init();

    await app
      .select(AppModule)
      .get(DI_CONSTANTS.IRedisService)
      .init();

    const port = await app
      .select(AppModule)
      .get(COMMON_DI_CONSTANTS.IConfig)
      .get('app.port');

    const host = await app
      .select(AppModule)
      .get(COMMON_DI_CONSTANTS.IConfig)
      .get('app.host');

    console.log(JSON.stringify({
      host,
      port,
    }));

    await app.listen(port, host);
  } catch (error) {
    throw error;
  }
}

bootstrap();

export default bootstrap;
