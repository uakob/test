import {
  Controller,
  Inject,
  Get,
  Param,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
} from './../../../common';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  IRedisService,
} from './../services';

@Controller()
@UseInterceptors(CacheInterceptor)
export class RedisController {
  private readonly redisService: IRedisService;

  constructor(
    @Inject(DI_CONSTANTS.IRedisService)
    redisService: IRedisService,
    ) {
      this.redisService = redisService;
    }

    @Get('/:key')
    public async get(
      @Param('key') key: string,
    ) {
      return this.redisService.get(key);
    }
  }
