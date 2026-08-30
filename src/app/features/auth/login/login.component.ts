import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const request = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.authService.saveSession(response);

        this.successMessage = 'Login successful.';

        setTimeout(() => {
          this.router.navigate(['medicines']);
        }, 1000);
      },
      error: (error) => {
        this.isLoading = false;

        console.error('Login failed:', error);

        this.errorMessage =
          error?.error?.error?.message ??
          'Login failed. Please check your email and password.';
      },
    });
  }
}
