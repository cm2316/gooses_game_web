import request from '@/request';
import fetcher, { getSearchParams } from '@/request/fetcher';
import { BaseResponse } from '@/types/BaseResponse';
import { AppItemResponse } from './types/AppItem';
import { AppListRequest } from './types/ListRequest';
import { AppListResponse } from './types/ListResponse';
enum Pathname {
  List = '/gamehtml5/list',
  GetById = '/gamehtml5/get',
  Collections = '/gamehtml5/collection',
  Categorys = '/gamehtml5/category',
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

  static getByIdMemo = async (id: string) => {
    const res = await fetcher<AppItemResponse>(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}${Pathname.GetById}?${getSearchParams({ id })}`,
    );
    return res;
  };

  static getCollections = async (): Promise<BaseResponse<string[]>> => {
    return request({
      url: Pathname.Collections,
    });
  };

  static getCollectionsMemo = async () => {
    const res = await fetcher<BaseResponse<string[]>>(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}${Pathname.Collections}`,
    );
    return res;
  };

  static getCategorys = async (): Promise<BaseResponse<string[]>> => {
    return request({
      url: Pathname.Categorys,
    });
  };

  static getCategorysMemo = async () => {
    const res = await fetcher<BaseResponse<string[]>>(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}${Pathname.Categorys}`,
    );
    return res;
  };
}
