import * as http from 'http';
import * as https from 'https';
import { parse as parseUrl } from 'url';
import { StringDecoder } from 'string_decoder';
import { ServerTransport, ServerTransportRequestOptions } from '../models/server-transport.model';

export class ServerHttp {
  private decoder: StringDecoder = new StringDecoder('utf-8');

  public get(url: string) {
    const { hostname, protocol, path } = parseUrl(url);
    const transport: ServerTransport = this.selectTransport(protocol);
    const options: ServerTransportRequestOptions = {
      hostname,
      path,
      method: 'GET',
    };

    const req: http.ClientRequest = transport.get(options, (res: http.IncomingMessage) => {
      res.on('data', (chunk: any) => {
        const data = this.decoder.write(chunk);
        console.log(chunk);
      });
    });

    req.on('error', (e: Error) => {
      console.error(e);
    });

    req.end();
  }

  private selectTransport(protocol: string | null): ServerTransport {
    if (protocol === null) throw new Error('Protocol is not specified.');
    return protocol.startsWith('https') ? https : http;
  }
}
