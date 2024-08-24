import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  errorMessage: string | null = null;
  loading = false;
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

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
    this.loading = true;
    this.authService.login(username, user_password).subscribe(
      (response) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token);         

          this.router
            .navigate(['/dashboard'])
            .then(() => {
              this.loading = false;
            })
            .catch(() => {
              this.errorMessage = 'An error occurred during navigation.';
              this.loading = false;
            });
        } else {
          this.errorMessage = 'Login failed. Please check your username and password.';
          this.loading = false;
        }
      },
      (error) => {
        // Display error messages from the API response without logging additional details
        this.errorMessage = error.message || 'Login failed. Please check your username and password.';
        this.loading = false;
      }
    );
  }
}