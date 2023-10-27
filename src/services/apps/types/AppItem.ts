import { BaseStatus, GameSource, GameType } from '@/types/BaseEnum';
import { BaseResponse } from '@/types/BaseResponse';

export interface AppItem {
  // ID
  id: number;
  // 游戏名称
  title: string;
  // 游戏描述
  description: string;
  // 游戏操作描述
  instructions: string;
  // 游戏收录集合
  collection: string;
  // 游戏来源
  from: GameSource;
  // 是否支持手机
  mobile: BaseStatus;
  // 手机模式
  mobileMode: string;
  // 游戏高度
  height: number;
  // 游戏宽度
  width: number;
  // 游戏封面
  thumb: string;
  // 游戏地址
  url: string;
  // 资源列表
  asset: string[];
  // 类型列表
  category: string[];
  // 标签列表
  tag: string[];

  https: BaseStatus;
  status: number;
  md5: string;
  type: GameType;
  subType: string;
  boundle: string[];
  company: string;
}

export interface AppItemResponse extends BaseResponse<AppItem> {}
