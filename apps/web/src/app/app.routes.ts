import { Route } from '@angular/router';

import { canInit } from '@flashcards/guards';
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
    // canActivate: [canLogged, canInit],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@flashcards/web/dashboard/page').then((modules) => modules.DashboardPageComponent),
      },
      // {
      //   path: 'dictionary',
      //   loadComponent: () => import('@flashcards/web/dictionary/page').then((modules) => modules.DictionaryPageComponent),
      // },
      // {
      //   path: 'learning',
      //   loadComponent: () => import('@flashcards/web/learning/page').then((modules) => modules.LearningPageComponent),
      // },
      // {
      //   path: 'users',
      //   loadChildren: () => import('./routes/users.routes').then((modules) => modules.usersRoutes),
      // },
      // {
      //   path: 'groups',
      //   loadChildren: () => import('./routes/groups.routes').then((modules) => modules.groupsRoutes),
      // },
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
