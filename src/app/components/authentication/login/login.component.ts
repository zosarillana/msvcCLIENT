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
  errorMessage: string | null = null;
  loading = false; // Add this line

  constructor(private authService: AuthService, private router: Router) {}

  hide = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault(); // Prevent the default action (e.g., form submission)
    keyboardEvent.stopPropagation(); // Stop the event from propagating further
  }

  onSubmit(username: string, user_password: string): void {
    if (this.loading) return;
    this.authService.login(username, user_password).subscribe(
      (response) => {
        if (response && response.token) {
          //console.log('Login successful, token received:', response.token);
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user)); // Store user info

          this.router
            .navigate(['/dashboard'])
            .then(() => {
            //  console.log('Navigation to dashboard complete.');
              this.loading = false;
            })
            .catch((error) => {
              console.error('Navigation error:', error);
              this.loading = false;
            });
        } else {
          console.log('No token received in the response:', response);
          this.errorMessage = 'Login failed. Please check your username and password.';
          this.loading = false;
        }
      },
      (error) => {
        console.log('Login error:', error);
        this.errorMessage = 'Login failed. Please check your username and password.';
        this.loading = false;
      }
    );
  }
}