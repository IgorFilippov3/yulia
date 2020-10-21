import { RequestOptions as HttpRequestOptions } from 'http';
import { RequestOptions as HttpsRequestOptions } from 'https';

export type ServerTransport = typeof import('http') | typeof import('https');

export type ServerTransportRequestOptions = HttpRequestOptions | HttpsRequestOptions;
