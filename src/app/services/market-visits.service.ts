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

  public updateMarketVisits(mvisit: MarketVisits): Observable<MarketVisits> {
    return this.http.put<MarketVisits>(
      `${environment.apiUrl}/${this.url}`,
      mvisit
    );
  }

  public createMarketVisits(mvisit: MarketVisits): Observable<MarketVisits> {
    return this.http.post<MarketVisits>(
      `${environment.apiUrl}/${this.url}`,
      mvisit
    );
  }

  public deleteMarketVisits(mvisit: MarketVisits): Observable<MarketVisits[]> {
    return this.http.delete<MarketVisits[]>(
      `${environment.apiUrl}/${this.url}/${mvisit.id}`
    );
  }
}
