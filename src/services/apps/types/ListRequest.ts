import type { PaginationRequest } from '@/types/PaginationRequest';

export interface AppListRequest extends PaginationRequest {
  name?: string;
  category?: string;
}
