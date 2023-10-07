import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Card, CARDS_KEY } from '@flashcards/cards/common';
import { LocalDBService } from '@flashcards/core';

@Injectable({
  providedIn: 'root',
})
export class CardStorage {
  constructor(private readonly localDBService: LocalDBService<{ cards: Card }>) {}

  getAll(): Observable<Card[]> {
    return this.localDBService.getAll(CARDS_KEY);
  }

  set(card: Card): Promise<void> {
    return this.localDBService.put(CARDS_KEY, card);
  }

  remove(cardOrUUid: Card | string): void {
    const uuid = typeof cardOrUUid === 'string' ? cardOrUUid : cardOrUUid.uuid;
    void this.localDBService.remove(CARDS_KEY, uuid);
  }
}
