import { PaginationResponse } from '@/types/PaginationResponse';
import { AppItem } from './AppItem';

export interface AppListResponse extends PaginationResponse<AppItem> {}
