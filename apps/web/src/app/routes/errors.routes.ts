import { Route } from '@angular/router';

/* eslint-disable max-len */
export const errorsRoutes: Route[] = [
  {
    path: 'permission-denied',
    loadComponent: () => import('@flashcards/web/errors/permission-denied/page').then((modules) => modules.PermissionDeniedPageComponent),
  },
  {
    path: '**',
    loadComponent: () => import('@flashcards/web/errors/not-found/page').then((modules) => modules.NotFoundPageComponent),
  },
];
/* eslint-enable max-len */
