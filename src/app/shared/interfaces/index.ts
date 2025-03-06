import { HttpStatusCode } from '@angular/common/http';

export interface IBaseResponse {
  status_code: HttpStatusCode;
  result: 'working' | Error;
}

export interface ICheckHealth extends IBaseResponse {
  detail: 'ok';
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  avatar?: string;
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

export interface IPasswordValidator {
  error: string;
  message: string;
}

export interface ICompany {
  title: string;
  description: string;
  visibility: boolean;
}
export interface ICompanyInfo extends ICompany {
  id: string;
  owner: IUserInfo;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ICompanyResponse extends IBaseResponse {
  detail: ICompanyInfo;
}

export interface ICompaniesResponse extends IBaseResponse {
  detail: ICompanyInfo[];
}
