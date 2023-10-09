import { Route } from '@angular/router';

import { canGroup } from '@flashcards/groups/guards';

/* eslint-disable max-len */
export const groupsRoutes: Route[] = [
  {
    path: ':uuid/edit',
    canActivate: [canGroup],
    loadComponent: () => import('@flashcards/web/groups/edit/page').then((modules) => modules.GroupEditPageComponent),
  },
];
/* eslint-enable max-len */
