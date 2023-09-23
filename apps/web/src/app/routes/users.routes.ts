import { Route } from '@angular/router';

import { UserLayoutComponent } from '@flashcards/web/users/ui/layout';

/* eslint-disable max-len */
export const usersRoutes: Route[] = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('@flashcards/web/users/profile/page').then((modules) => modules.ProfilePageComponent),
      },
    ],
  },
];
/* eslint-enable max-len */
