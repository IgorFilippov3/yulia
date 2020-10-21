import { YuliaHttpClient } from '../models/yulia-http-client.model';
import { YuliaRequestOptions } from '../models/yulia-request-options.model';
import { YuliaResponse } from '../models/yulia-response.model';
import { ClientHttp } from './client-http';
import { ServerHttp } from './server-http';
import { isBrowser } from '../utils';

class Yulia implements YuliaHttpClient {
  private httpClient: ClientHttp | ServerHttp = this.selectHttpClient();

  public get<T>(path: string, options: YuliaRequestOptions = {}): Promise<YuliaResponse<T>> {
    return this.httpClient.get(path, options);
  }

  private selectHttpClient(): ClientHttp | ServerHttp {
    return isBrowser() ? new ClientHttp() : new ServerHttp();
  }
}

export const yulia = new Yulia();
