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

export enum Role {
  OWNWER = 1000,
  ADMIN = 500,
  MEMBER = 100,
}

export interface IActionBody {
  ownerVerdict: boolean;
  userVerdict: boolean;
  company: ICompanyInfo;
  user: IUserInfo;
  role?: Role;
}

export interface IAction extends IActionBody {
  id: string;
}

export interface IActionResponse extends IBaseResponse {
  detail: IAction;
}

export interface IActionsResponse extends IBaseResponse {
  detail: IAction[];
}

export interface ICompanyWithAction extends ICompanyInfo {
  action: IAction | undefined;
}

export interface IUserWithAction extends IUserInfo {
  action?: IAction | undefined;
}

export interface IQuizInfoBody {
  title: string;
  description: string;
  frequency: number;
  company: ICompanyInfo;
}

export interface IQuizInfo extends IQuizInfoBody {
  id: string;
  valid?: boolean;
}

export interface IQuizInfoResponse extends IBaseResponse {
  detail: IQuizInfo;
}

export interface IQuizzesInfoResponse extends IBaseResponse {
  detail: IQuizInfo[];
}

export interface IQuizQuestionBody {
  question: string;
  quiz: IQuizInfo;
}

export interface IQuizQuestion extends IQuizQuestionBody {
  id: string;
}

export interface IQuizQuestionResponse extends IBaseResponse {
  detail: IQuizQuestion;
}

export interface IQuizQuestionsResponse extends IBaseResponse {
  detail: IQuizQuestion[];
}

export interface IQuizAnswerBody {
  text: string;
  correct: boolean;
  element: IQuizQuestion;
}

export interface IQuizAnswer extends IQuizAnswerBody {
  id: string;
}

export interface IQuizAnswerResponse extends IBaseResponse {
  detail: IQuizAnswer;
}

export interface IQuizAnswersResponse extends IBaseResponse {
  detail: IQuizAnswer[];
}

export interface IElem {
  quest: IQuizQuestion;
  answers: IQuizAnswer[];
}

export interface IElemsResponse extends IBaseResponse {
  detail: IElem[];
}

export interface IQuizResultBody {
  questions: number;
  correctAnswers: number;
  quiz: IQuizInfo;
}

export interface IQuizResult extends IQuizResultBody {
  id: string;
  memberQuestions: number;
  memberCorrectAnswers: number;
  userQuestions: number;
  userCorrectAnswers: number;
  user: IUserInfo;
  createdAt: Date;
}

export interface IQuizResultResponse extends IBaseResponse {
  detail: IQuizResult;
}

export interface IQuizResultsResponse extends IBaseResponse {
  detail: IQuizResult[];
}
