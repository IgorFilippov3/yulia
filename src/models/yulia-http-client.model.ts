import { YuliaRequestOptions } from './yulia-request-options.model';
import { YuliaResponse } from './yulia-response.model';

export interface YuliaHttpClient {
  get<T>(path: string, options: YuliaRequestOptions): Promise<YuliaResponse<T>>;
}
