import { inject, Pipe, PipeTransform } from '@angular/core';
import { EMPTY, map, Observable, take } from 'rxjs';

import { Card } from '@flashcards/cards/common';
import { CardService } from '@flashcards/cards/services';
import { Group } from '@flashcards/groups/common';

@Pipe({
  name: 'getCardsLearn',
  standalone: true,
})
export class GetCardsLearnPipe implements PipeTransform {
  readonly cardService = inject(CardService);

  transform(groupOrGroupUuid: Group | string | null | undefined): Observable<Card[]> {
    if (!groupOrGroupUuid) {
      return EMPTY;
    }

    return this.cardService.cardsByGroup$(typeof groupOrGroupUuid === 'string' ? groupOrGroupUuid : groupOrGroupUuid.uuid).pipe(
      take(1),
      map((cards) => cards.filter((card) => !card.learned)),
    );
  }
}
