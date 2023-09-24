import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Card, CardChange, CardCreate } from '@flashcards/cards/common';
import { ApiService } from '@flashcards/core';

@Injectable({
  providedIn: 'root',
})
export class CardApi {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<Card[]> {
    return this.apiService.get('/cards');
  }

  create(card: CardCreate): Observable<Card> {
    return this.apiService.post('/cards', card);
  }

  change(card: CardChange): Observable<Card> {
    return this.apiService.patch('/cards', card);
  }

  sync(cards: Card[]): Observable<Card> {
    return this.apiService.post('/cards/sync', cards);
  }
}
