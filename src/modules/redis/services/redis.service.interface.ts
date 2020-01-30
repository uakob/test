export interface IRedisService {
  init(): Promise<void>;
  get(key: any): Promise<any>;
  set(key: any, value: any): Promise<any>;
}
