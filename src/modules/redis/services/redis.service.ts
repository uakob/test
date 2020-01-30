import * as Redis from 'ioredis';

import { Injectable, Inject } from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  IConfigService,
  IConfigData,
} from '../../../common';

import { DI_CONSTANTS } from '../../../di_constants';

import { IRedisService } from './redis.service.interface';

export enum ERedisStatus {
  ready = 'ready',
}

@Injectable()
export class RedisService implements IRedisService {
  public static readonly configSection: string = 'redis';
  private config: IConfigData;
  private storage: Redis.Redis;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigData,
  ) {
    this.config = config.get(RedisService.configSection);

    this.storage = new Redis(
      this.config.host,
      this.config.port,
      { lazyConnect: true },
    );
  }

  public async init(): Promise<void> {
    console.log(JSON.stringify({
      service: 'RedisService',
      call: 'INIT',
      config: this.config,
    }));

    if (this.storage.status !== ERedisStatus.ready) {
      await this.storage.connect();
    }

    // await this.storage.config('set', 'maxclients', this.config.maxClients);

    return;
  }

  public async get(key: Redis.KeyType): Promise<any> {
    return this.storage.get(key);
  }

  public async set(key: Redis.KeyType, value: any): Promise<any> {
    return this.storage.set(key, value);
  }
}
