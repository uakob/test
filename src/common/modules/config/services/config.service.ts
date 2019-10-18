import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import * as config from 'config';

import {
  Injectable,
} from '@nestjs/common';

import {
  env as envSchema,
} from './../schemas/';

import {
  IConfigData,
  IConfigService,
} from './config.service.interface';

@Injectable()
export class ConfigService implements IConfigService {
  private config: any;

  constructor() {
    const env = dotenv.config();

    this.config = this.validateInput(env.parsed, envSchema);

    this.config = config;

    console.log(JSON.stringify({
      service: 'configService',
      call: 'INIT',
    }));
  }

  private validateInput(config: IConfigData, schema: Joi.ObjectSchema): IConfigData {
    const { error, value: validConfig } = Joi.validate(
      config,
      schema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validConfig;
  }

  public get(): any {
    return this.config;
  }
}
