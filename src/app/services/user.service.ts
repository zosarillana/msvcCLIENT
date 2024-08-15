import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'User';

  constructor(private http: HttpClient) {}

  public getMarketVisits(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateMarketVisits(mvisit: User): Observable<User> {
    return this.http.put<User>(
      `${environment.apiUrl}/${this.url}`,
      mvisit
    );
  }

  public createMarketVisits(mvisit: User): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}`,
      mvisit
    );
  }

  public deleteMarketVisits(mvisit: User): Observable<User[]> {
    return this.http.delete<User[]>(
      `${environment.apiUrl}/${this.url}/${mvisit.id}`
    );
  }
}
