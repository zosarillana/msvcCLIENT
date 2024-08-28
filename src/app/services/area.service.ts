import { Injectable } from '@angular/core';
import { MarketVisits } from '../models/market-visits';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private url = 'Area';

  constructor(private http: HttpClient) {}

  public getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateAreas(mvisit: Area): Observable<Area> {
    return this.http.put<Area>(
      `${environment.apiUrl}/${this.url}`,
      mvisit
    );
  }

  public createAreas(mvisit: Area): Observable<Area> {
    return this.http.post<Area>(
      `${environment.apiUrl}/${this.url}`,
      mvisit
    );
  }

  public deleteAreas(mvisit: Area): Observable<Area[]> {
    return this.http.delete<Area[]>(
      `${environment.apiUrl}/${this.url}/${mvisit.id}`
    );
  }
  
  getAreaCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/count`);
  }
  
}
