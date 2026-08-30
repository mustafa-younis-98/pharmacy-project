import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  showLogoutConfirmation = false;

  logout(): void {
    this.showLogoutConfirmation = true;
  }

  confirmLogout(): void {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutConfirmation = false;
  }
}
