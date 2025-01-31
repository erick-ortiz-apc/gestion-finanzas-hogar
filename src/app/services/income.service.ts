import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor (private readonly _http: HttpClient) { }

  getListIncomes() {
    return this._http.get<any>(`${environment.API_DOMAINS.API_URL_INCOMES}`);
  }

  deleteIncome(id: number) {
    return this._http.delete<any>(`${environment.API_DOMAINS.API_URL_INCOMES}/${id}`);
  }

  addIncome(ingreso: any) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(ingreso);
    return this._http.post<any>(`${environment.API_DOMAINS.API_URL_INCOMES}`, body, { headers });
  }

  editIncome(ingreso: any) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(ingreso);
    return this._http.put<any>(`${environment.API_DOMAINS.API_URL_INCOMES}/${ingreso.inSoId}`, body, { headers });
  }
}
