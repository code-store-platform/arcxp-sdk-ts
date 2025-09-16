import { ArcAPIOptions } from './abstract-api';
import { CustomApi, RequestConfig } from './custom-api';

export function createRequestFunction(options: ArcAPIOptions) {
  const customApi = new CustomApi(options);

  return <T>(endpoint: `/${string}`, config: RequestConfig) => {
    return customApi.request<T>(endpoint, config);
  };
}
