import { Route } from '@angular/router';

import { canGroup } from '@flashcards/groups/guards';

/* eslint-disable max-len */
export const groupsRoutes: Route[] = [
  {
    path: ':uuid',
    canActivate: [canGroup],
    children: [
      {
        path: 'edit',
        loadComponent: () => import('@flashcards/web/groups/edit/page').then((modules) => modules.GroupEditPageComponent),
      },
      {
        path: 'learn',
        loadComponent: () => import('@flashcards/web/groups/learn/page').then((modules) => modules.GroupLearnComponent),
      },
    ],
  },
];
/* eslint-enable max-len */
