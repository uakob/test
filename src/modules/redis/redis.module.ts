import {
  Module,
  CacheModule,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  ConfigModule,
  IConfigService,
  IConfigData,
} from '../../common';

import { RedisController } from './controllers/redis.controller';

import { DI_CONSTANTS } from '../../di_constants';

import { RedisService } from './services';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      useFactory: (configService: IConfigData) => ({
        ttl: configService.get('cache').ttl,
        max: configService.get('cache').max,
      }),
      inject: [COMMON_DI_CONSTANTS.IConfigService],
    }),
  ],
  controllers: [
    RedisController,
  ],
  providers: [
    {
      provide: DI_CONSTANTS.IRedisService,
      useClass: RedisService,
    },
  ],
  exports: [
    DI_CONSTANTS.IRedisService,
  ],
})
export class RedisModule {}
