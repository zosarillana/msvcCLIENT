import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = true;
  errorMessage: string | null = null;
  loading = false; // Add this line

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onSubmit(username: string, user_password: string): void {
    if (this.loading) return; // Prevent multiple submissions

    this.loading = true;
    console.log('Attempting login with:', { username, user_password });

    this.authService.login(username, user_password).subscribe(
      response => {
        if (response && response.token) {
          console.log('Login successful, token received:', response.token);
          localStorage.setItem('jwtToken', response.token);

          const token = localStorage.getItem('jwtToken');
          console.log('Token in localStorage:', token);

          this.router.navigate(['/dashboard']).then(() => {
            console.log('Navigation to dashboard complete.');
            this.loading = false;
          }).catch(error => {
            console.error('Navigation error:', error);
            this.loading = false;
          });
        } else {
          console.log('No token received in the response:', response);
          this.errorMessage = 'Login failed. Please check your username and password.';
          this.loading = false;
        }
      },
      error => {
        console.log('Login error:', error);
        this.errorMessage = 'Login failed. Please check your username and password.';
        this.loading = false;
      }
    );
  }
}