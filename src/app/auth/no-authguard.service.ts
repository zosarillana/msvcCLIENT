import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Redirect to dashboard if already logged in
      this.router.navigate(['/dashboard']); // Adjust path as needed
      return false; // Prevent access to the login page
    }
    return true; // Allow access to the login page if not logged in
  }
}
