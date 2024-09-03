import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pap } from '../models/pap';

@Injectable({
  providedIn: 'root'
})
export class PapService {
  private url = 'Pap';

  constructor(private http: HttpClient) {}

  public getPaps(): Observable<Pap[]> {
    return this.http.get<Pap[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updatePaps(formData: FormData): Observable<Pap> {
    return this.http.put<Pap>(
      `${environment.apiUrl}/${this.url}/update`, 
      formData
    );
  }  
  createPaps(formData: FormData): Observable<Pap> {
    return this.http.post<Pap>(
      `${environment.apiUrl}/${this.url}/upload`,
      formData
    );
  }  
  public deletePaps(mvisit: Pap): Observable<Pap[]> {
    return this.http.delete<Pap[]>(
      `${environment.apiUrl}/${this.url}/${mvisit.id}`
    );
  }
  
  getPapsCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/count`);
  }
  
}
