import { Route } from '@angular/router';

import { LayoutComponent } from '@flashcards/web/ui/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
