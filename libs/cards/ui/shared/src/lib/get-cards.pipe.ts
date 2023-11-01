import { inject, Pipe, PipeTransform } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { Card } from '@flashcards/cards/common';
import { CardService } from '@flashcards/cards/services';
import { Group } from '@flashcards/groups/common';

@Pipe({
  name: 'getCards',
  standalone: true,
})
export class GetCardsPipe implements PipeTransform {
  readonly cardService = inject(CardService);

  transform(groupOrGroupUuid: Group | string | null | undefined, learn?: boolean): Observable<Card[]> {
    if (!groupOrGroupUuid) {
      return EMPTY;
    }

    return this.cardService.cardsByGroup$(typeof groupOrGroupUuid === 'string' ? groupOrGroupUuid : groupOrGroupUuid.uuid);
  }
}
