import { Injectable } from '@angular/core';
import { MarketVisits } from '../models/market-visits';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketVisitsService {
  private url = 'MarketVisits';

  constructor(private http: HttpClient) {}

  public getMarketVisits(): Observable<MarketVisits[]> {
    return this.http.get<MarketVisits[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateMarketVisits(
    id: number,
    formData: FormData
  ): Observable<MarketVisits> {
    return this.http.put<MarketVisits>(
      `${environment.apiUrl}/${this.url}/${id}`,
      formData
    );
  }

  getVisitById(id: string): Observable<MarketVisits> {
    return this.http.get<MarketVisits>(
      `${environment.apiUrl}/${this.url}/${id}`
    );
  }

  public createMarketVisits(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.url}`, formData);
  }

  public deleteMarketVisits(mvisit: MarketVisits): Observable<MarketVisits[]> {
    return this.http.delete<MarketVisits[]>(
      `${environment.apiUrl}/${this.url}/${mvisit.id}`
    );
  }

  getVisitCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/count`);
  }
}
