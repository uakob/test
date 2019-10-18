import { Injectable, Inject } from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  IConfigService,
  IConfigData,
} from './../../../common';

import { DI_CONSTANTS } from './../../../di_constants';

import { IAppService } from './app.service.interface';

@Injectable()
export class AppService implements IAppService {
  private config: IConfigData;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigData,
  ) {
    this.config = config;
  }

  public async init(): Promise<void> {
    console.log(JSON.stringify({
      service: 'appService',
      call: 'INIT',
      config: this.config,
    }));

    return;
  }
}
