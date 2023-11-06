export interface BaseResponse<T> {
  data: T;
  errorMessage: string;
  success: boolean;
}

export interface StringArrayResponse extends BaseResponse<string[]> {}
