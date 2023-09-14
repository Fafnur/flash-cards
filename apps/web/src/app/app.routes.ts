import { Route } from '@angular/router';

import { canAuth, canLogged } from '@flashcards/web/auth/guards';
import { LayoutComponent } from '@flashcards/web/ui/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // {
      //   path: '',
      //   component: HeaderComponent,
      //   outlet: 'header',
      // },
      // {
      //   path: '',
      //   component: FooterComponent,
      //   outlet: 'footer',
      // },
      {
        path: 'dashboard',
        canActivate: [canLogged],
        loadComponent: () => import('@flashcards/web/dashboard/page').then((modules) => modules.DashboardPageComponent),
      },
      {
        path: 'auth',
        canActivate: [canAuth],
        loadChildren: () => import('./routes/auth.routes').then((modules) => modules.authRoutes),
      },
      {
        path: 'permission-denied',
        loadComponent: () =>
          import('@flashcards/web/errors/permission-denied/page').then((modules) => modules.PermissionDeniedPageComponent),
      },
      {
        path: '**',
        loadComponent: () => import('@flashcards/web/errors/not-found/page').then((modules) => modules.NotFoundPageComponent),
      },
    ],
  },
];
