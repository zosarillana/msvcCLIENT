import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'User';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/${this.url}`, user).pipe(
      catchError(this.handleError) // Use catchError inside pipe
    );
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/${this.url}`, user).pipe(
      catchError(this.handleError) // Use catchError inside pipe
    );
  }

  public deleteMarketVisits(user: User): Observable<User[]> {
    return this.http.delete<User[]>(
      `${environment.apiUrl}/${this.url}/${user.id}`
    ).pipe(
      catchError(this.handleError) // Use catchError inside pipe
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: any = {
      message: 'An unknown error occurred!',
    };

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage.message = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && typeof error.error === 'object') {
        errorMessage = error.error;
      } else {
        errorMessage.message = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    return throwError(errorMessage);
  }
}
