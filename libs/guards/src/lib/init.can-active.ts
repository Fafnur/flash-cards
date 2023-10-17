import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { combineLatest, map, take } from 'rxjs';

import { CardService } from '@flashcards/cards/services';
import { GroupService } from '@flashcards/groups/services';
import { UserService } from '@flashcards/users/services';

export const canInit: CanActivateFn = () => {
  const groupService = inject(GroupService);
  const cardService = inject(CardService);
  const userService = inject(UserService);

  return combineLatest([userService.user$, cardService.cards$, groupService.groups$]).pipe(
    take(1),
    map(() => true),
  );
};
