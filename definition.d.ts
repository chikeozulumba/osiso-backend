export interface IObject {
  [key: string]: any;
}

export interface IResponseData {
  token?: string;
  [key: string]: string;
}

export interface IResponse<T> {
  statusCode: number;
  status?: boolean | 'success' | 'error';
  code?: number | string;
  message?: string;
  data?: IObject | T;
}
