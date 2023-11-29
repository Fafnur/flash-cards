import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { GroupService } from '@flashcards/groups/services';

export const canGroup: CanActivateFn = (route) => {
  const groupService = inject(GroupService);
  const router = inject(Router);

  const { uuid } = route.params;

  console.log(uuid);
  if (!uuid) {
    return false;
  }

  return groupService.group$(uuid).pipe(
    take(1),
    map((group) => {
      if (group) {
        return true;
      }

      return router.createUrlTree(['/', 'learning']);
    }),
  );
};
