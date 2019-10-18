export interface IRedisService {
  init(): Promise<void>;
  get(key: any): Promise<any>;
}
