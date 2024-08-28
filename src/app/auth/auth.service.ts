import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, user_password: string): Observable<{ token: string; }> {
    const loginData = { username, user_password };
    return this.http
      .post<{ token: string; }>(this.apiUrl, loginData)
      .pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const expiry = new Date(decodedToken.exp * 1000); // Convert exp to milliseconds
      return new Date() < expiry; // Check if the current date is before the token expiry
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Get the payload part of the token
      const decodedPayload = atob(payload); // Decode the base64 string
      return JSON.parse(decodedPayload); // Parse it into a JSON object
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    // Format the error message without logging to the console
    let errorMessage = 'An unknown error occurred!';
    if (error.error.errors) {
      // Detailed error messages from the API
      errorMessage = Object.values(error.error.errors).flat().join(' ');
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

  