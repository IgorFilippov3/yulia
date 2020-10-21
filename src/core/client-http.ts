import { YuliaHttpClient } from '../models/yulia-http-client.model';
import { YuliaRequestOptions } from '../models/yulia-request-options.model';
import { YuliaResponse } from '../models/yulia-response.model';

export class ClientHttp implements YuliaHttpClient {
  get<T>(path: string, options: YuliaRequestOptions = {}): Promise<YuliaResponse<T>> {
    return new Promise((resolve, reject) => {
      const transport: XMLHttpRequest = new XMLHttpRequest();

      transport.addEventListener('load', function () {
        const data: T = JSON.parse(this.responseText);
        resolve({ data });
      });

      transport.addEventListener('error', (e) => {
        reject(e);
      });

      transport.open('GET', path);
      transport.responseType = 'json';
      transport.send();
    });
  }
}
