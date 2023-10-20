import type { BaseResponse } from './BaseResponse';
export interface PaginationResponse<T> extends BaseResponse<{ total: number; data: T[] }> {}
