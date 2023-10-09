import { Route } from '@angular/router';

import { canAuth, canLogged } from '@flashcards/web/auth/guards';
import { LayoutComponent } from '@flashcards/web/ui/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        // canActivate: [canLogged],
        loadComponent: () => import('@flashcards/web/dashboard/page').then((modules) => modules.DashboardPageComponent),
      },
      {
        path: 'dictionary',
        // canActivate: [canLogged],
        loadComponent: () => import('@flashcards/web/dictionary/page').then((modules) => modules.DictionaryPageComponent),
      },
      {
        path: 'users',
        canActivate: [canLogged],
        loadChildren: () => import('./routes/users.routes').then((modules) => modules.usersRoutes),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [canAuth],
    loadChildren: () => import('./routes/auth.routes').then((modules) => modules.authRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./routes/errors.routes').then((modules) => modules.errorsRoutes),
  },
];
