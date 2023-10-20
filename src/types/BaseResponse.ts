export interface BaseResponse<T> {
  data: T;
  errorMessage: string;
  success: boolean;
}
