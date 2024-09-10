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
      // console.log('Decoded Token Payload:', decodedPayload); // Add this for debugging
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
  }

  decodeTokenAndSetUser(): void {
    const token = localStorage.getItem('jwtToken');
    // console.log('Token from localStorage:', token); // Add this for debugging
    if (token) {
      this.user = this.decodeToken(token);
      // console.log('User after decoding token:', this.user); // Add this for debugging
    } else {
      this.user = null;
    }
  }

  getUser(): any {
    return this.user;
  }
}
