import request from '@/request';
import { AppItemResponse } from './types/AppItem';
import { AppListRequest } from './types/ListRequest';
import { AppListResponse } from './types/ListResponse';

export default class AppService {
  static list = (params: AppListRequest): Promise<AppListResponse> => {
    return request({
      url: '/game/list',
      params,
      headers: {
        'x-gooses': '5ce0a277-faf3-4c52-87fe-603b381ce798',
      },
    });
  };

  static getById = (id: string): Promise<AppItemResponse> => {
    return request({
      url: '/game/get',
      params: { id },
      headers: {
        'x-gooses': '5ce0a277-faf3-4c52-87fe-603b381ce798',
      },
    });
  };
}
