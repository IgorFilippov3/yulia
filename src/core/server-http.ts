import * as http from 'http';
import * as https from 'https';
import { parse as parseUrl } from 'url';
import { StringDecoder } from 'string_decoder';
import { ServerTransport, ServerTransportRequestOptions } from '../models/server-transport.model';
import { YuliaResponse } from '../models/yulia-response.model';
import { YuliaRequestOptions } from '../models/yulia-request-options.model';
import { YuliaHttpClient } from '../models/yulia-http-client.model';

export class ServerHttp implements YuliaHttpClient {
  private decoder: StringDecoder = new StringDecoder('utf-8');

  public get<T>(url: string, options: YuliaRequestOptions = {}): Promise<YuliaResponse<T>> {
    return new Promise((resolve, reject) => {
      const { hostname, protocol, path } = parseUrl(url);
      const transport: ServerTransport = this.selectTransport(protocol);
      const requestOptions: ServerTransportRequestOptions = {
        ...options,
        hostname,
        path,
        method: 'GET',
      };

      const req: http.ClientRequest = transport.get(requestOptions, (res: http.IncomingMessage) => {
        let isDataRetrieved: boolean = false;

        res.on('data', (chunk: any) => {
          const json: string = this.decoder.write(chunk);
          const data: T = JSON.parse(json);
          isDataRetrieved = true;
          resolve({ data });
        });

        res.on('end', () => {
          if (!isDataRetrieved) {
            resolve({ data: null });
          }
        });
      });

      req.on('error', (e: Error) => {
        reject(e);
      });

      req.end();
    });
  }

  private selectTransport(protocol: string | null): ServerTransport {
    if (protocol === null) throw new Error('Protocol is not specified.');
    return protocol.startsWith('https') ? https : http;
  }
}
