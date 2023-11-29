import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { AuthService } from '@flashcards/auth/services';

@Component({
  selector: 'flashcards-settings-logout',
  templateUrl: './settings-logout.component.html',
  styleUrl: './settings-logout.component.scss',
  standalone: true,
  imports: [MatButtonModule],
})
export class SettingsLogoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogout() {
    this.authService.logout();
    void this.router.navigate(['/', 'auth', 'login']);
  }
}
