import { Route } from '@angular/router';

/* eslint-disable max-len */
export const groupsRoutes: Route[] = [
  {
    path: ':group/edit',
    loadComponent: () => import('@flashcards/web/groups/edit/page').then((modules) => modules.GroupEditPageComponent),
  },
];
/* eslint-enable max-len */
