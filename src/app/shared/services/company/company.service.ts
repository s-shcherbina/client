import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environtments/environtment';
import {
  IBaseResponse,
  ICompaniesResponse,
  ICompany,
  ICompanyInfo,
  ICompanyResponse,
} from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  http = inject(HttpClient);
  public companies = signal([] as ICompanyInfo[]);
  public company = signal({} as ICompanyInfo);

  public create(body: ICompany) {
    return this.http.post<ICompanyResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/companies`,
      body
    );
  }

  public getAll() {
    return this.http.get<ICompaniesResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/companies`
    );
  }

  public getMy() {
    return this.http.get<ICompaniesResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/companies/my`
    );
  }

  public getById(id: string) {
    return this.http.get<ICompanyResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/companies/${id}`
    );
  }

  public update(id: string, body: Partial<ICompany>) {
    return this.http.patch<IBaseResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/companies/${id}`,
      body
    );
  }

  public delete(id: string) {
    return this.http.delete<ICompanyResponse>(
      `https://meduzzen-backend-965114150226.europe-west10.run.app/companies/${id}`
    );
  }
}
