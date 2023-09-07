import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@flashcards/auth/services';

export const canLogged: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.logged) {
    return true;
  }

  return router.createUrlTree(['/', 'auth', 'login']);
};
