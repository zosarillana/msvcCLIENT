import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, user_password: string): Observable<{ token: string }> {
    const loginData = { username, user_password };
    return this.http.post<{ token: string }>(this.apiUrl, loginData).pipe(
      catchError(this.handleError)
    );
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

