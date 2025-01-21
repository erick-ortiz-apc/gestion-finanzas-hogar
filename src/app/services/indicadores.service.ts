import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndicadoresService {
  private apiUrl = 'https://mindicador.cl/api';

  constructor(private http: HttpClient) {}

  getIndicadores(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los datos de la API:', error);
        return of(null);
      })
    );
  }
}
