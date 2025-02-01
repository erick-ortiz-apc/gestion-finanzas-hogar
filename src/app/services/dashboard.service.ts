import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor (private readonly _http: HttpClient) { }

  getAvailablePeriods() {
    return this._http.get<any>(`${environment.API_DOMAINS.API_URL_DASHBOARD}`);
  }

  getDataDashboard(period: any) {
    return this._http.get<any>(`${environment.API_DOMAINS.API_URL_DASHBOARD}/${period}`);
  }
}
