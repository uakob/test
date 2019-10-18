import { IConfig } from 'config';

export interface IConfigData {
  [key: string]: any | IConfigData;
}

export interface IConfigService {
  get(): IConfig;
}
