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

// TODO implement custom after interceptor with key-value storage that stores exactly key requested and number of current clients waiting for job finish
// TODO implement custom before interceptor like above
// NOTE or combine into one (it's rx already)
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

    const { port } = await app
      .select(AppModule)
      .get(COMMON_DI_CONSTANTS.IConfig)
      .get('app');

    console.log(JSON.stringify({ app_port: port }));

    await app.listen(port, '0.0.0.0');
  } catch (error) {
    throw error;
  }
}

bootstrap();

export default bootstrap;
