import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor (private readonly _http: HttpClient) { }

  getListExpenses() {
    return this._http.get<any>(`${environment.API_DOMAINS.API_URL_EXPENSES}`);
  }

  deleteExpense(id: number) {
    return this._http.delete<any>(`${environment.API_DOMAINS.API_URL_EXPENSES}/${id}`);
  }

  addExpense(gasto: any) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(gasto);
    return this._http.post<any>(`${environment.API_DOMAINS.API_URL_EXPENSES}`, body, { headers });
  }

  editExpense(gasto: any) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(gasto);
    return this._http.put<any>(`${environment.API_DOMAINS.API_URL_EXPENSES}/${gasto.exSoId}`, body, { headers });
  }
}
