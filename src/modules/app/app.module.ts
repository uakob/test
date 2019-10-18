import { Module } from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  ConfigModule,
} from '../../common';

import { DI_CONSTANTS } from '../../di_constants';

import { RedisModule } from './../redis';

import { AppService } from './services';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
  ],
  providers: [
    {
      provide: DI_CONSTANTS.IAppService,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
