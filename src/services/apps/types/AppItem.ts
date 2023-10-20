import { BaseResponse } from '@/types/BaseResponse';

export interface AppItem {
  id: number;
  packageName: string;
  banner: string;
  icon: string;
  tile: string;
  logo: string;
  appName: string;
  category: string;
  playUrl: string;
  createdAt: string;
}

export interface AppItemResponse extends BaseResponse<AppItem> {}
