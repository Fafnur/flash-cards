import { Route } from '@angular/router';

import { canInit } from '@flashcards/guards';
import { canAuth, canLogged } from '@flashcards/web/auth/guards';
import { LayoutComponent } from '@flashcards/web/ui/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'learning',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canLogged, canInit],
    children: [
      {
        path: 'learning',
        loadComponent: () => import('@flashcards/web/learning/page').then((modules) => modules.LearningPageComponent),
      },
      {
        path: 'dictionary',
        loadComponent: () => import('@flashcards/web/dictionary/page').then((modules) => modules.DictionaryPageComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('@flashcards/web/profile/page').then((modules) => modules.ProfilePageComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('@flashcards/web/settings/page').then((modules) => modules.SettingPageComponent),
      },
      {
        path: 'groups',
        loadChildren: () => import('./routes/groups.routes').then((modules) => modules.groupsRoutes),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [canAuth],
    loadChildren: () => import('./routes/auth.routes').then((modules) => modules.authRoutes),
  },
  {
    path: 'permission-denied',
    loadComponent: () => import('@flashcards/web/errors/permission-denied/page').then((modules) => modules.PermissionDeniedPageComponent),
  },
  {
    path: '**',
    loadComponent: () => import('@flashcards/web/errors/not-found/page').then((modules) => modules.NotFoundPageComponent),
  },
];
