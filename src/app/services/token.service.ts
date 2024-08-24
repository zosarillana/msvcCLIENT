import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private user: any = null;

  constructor() {}

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
  }

  decodeTokenAndSetUser(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.user = this.decodeToken(token);
    } else {
      this.user = null;
    }
  }

  getUser(): any {
    return this.user;
  }
}
