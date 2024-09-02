import { Injectable } from '@angular/core';
import { Isr } from '../models/isr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsrService {
  private url = 'Isr';

  constructor(private http: HttpClient) {}

  public getIsrs(): Observable<Isr[]> {
    return this.http.get<Isr[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateIsrs(formData: FormData): Observable<Isr> {
    return this.http.put<Isr>(
      `${environment.apiUrl}/${this.url}/update`, // Adjusted URL
      formData
    );
  }  
  createIsrs(formData: FormData): Observable<Isr> {
    return this.http.post<Isr>(
      `${environment.apiUrl}/${this.url}/upload`,
      formData
    );
  }  
  public deleteIsrs(mvisit: Isr): Observable<Isr[]> {
    return this.http.delete<Isr[]>(
      `${environment.apiUrl}/${this.url}/${mvisit.id}`
    );
  }
  
  getIsrCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/count`);
  }
  
}
