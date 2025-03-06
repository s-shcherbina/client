import { HttpStatusCode } from '@angular/common/http';

export interface IBaseResponse {
  status_code: HttpStatusCode;
  result: 'working' | Error;
}

export interface ICheckHealth extends IBaseResponse {
  detail: 'ok';
}

export interface IUserInfo {
  id: string;
  name: string;
  avatar?: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ITokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface ITokensResponse extends IBaseResponse {
  detail: ITokens;
}

export interface IUsersResponse extends IBaseResponse {
  detail: IUserInfo[];
}

export interface IUserResponse extends IBaseResponse {
  detail: IUserInfo;
}
