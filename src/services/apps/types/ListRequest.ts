import { BaseStatus, GameSource } from '@/types/BaseEnum';
import type { PaginationRequest } from '@/types/PaginationRequest';

export interface AppListRequest extends PaginationRequest {
  name?: string;
  category?: string;
  from?: GameSource;
  mobile?: BaseStatus;
  collection?: string;
}
