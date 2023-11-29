import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@flashcards/auth/services';

export const canAuth: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.logged) {
    return true;
  }

  return router.createUrlTree(['/', 'learning']);
};
