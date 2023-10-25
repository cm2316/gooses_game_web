import request from '@/request';
import fetcher, { getSearchParams } from '@/request/fetcher';
import React from 'react';
import { AppItemResponse } from './types/AppItem';
import { AppListRequest } from './types/ListRequest';
import { AppListResponse } from './types/ListResponse';
export const revalidate = 3600;
enum Pathname {
  List = '/game/list',
  GetById = '/game/get',
}
export default class AppService {
  static list = (params?: AppListRequest): Promise<AppListResponse> => {
    return request({
      url: Pathname.List,
      params,
    });
  };

  static listMemo = async (params?: AppListRequest) => {
    const res = await fetcher<AppListResponse>(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}${Pathname.List}?${getSearchParams(params as any)}`,
    );
    return res;
  };

  static getById = (id: string): Promise<AppItemResponse> => {
    return request({
      url: Pathname.GetById,
      params: { id },
    });
  };

  static getByIdMemo = React.cache(async (id: string) => {
    const res = await fetcher<AppItemResponse>(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}${Pathname.GetById}?${getSearchParams({ id })}`,
    );
    return res;
  });
}
