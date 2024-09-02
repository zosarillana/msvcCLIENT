import { Injectable } from '@angular/core';
import { Pod } from '../models/pod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PodService {
  private url = 'Pod';

  constructor(private http: HttpClient) {}

  public getPods(): Observable<Pod[]> {
    return this.http.get<Pod[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updatePods(formData: FormData): Observable<Pod> {
    return this.http.put<Pod>(
      `${environment.apiUrl}/${this.url}/update`, 
      formData
    );
  }  
  createPods(formData: FormData): Observable<Pod> {
    return this.http.post<Pod>(
      `${environment.apiUrl}/${this.url}/upload`,
      formData
    );
  }  
  public deletePods(mvisit: Pod): Observable<Pod[]> {
    return this.http.delete<Pod[]>(
      `${environment.apiUrl}/${this.url}/${mvisit.id}`
    );
  }
  
  getPodsCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/count`);
  }
  
}
