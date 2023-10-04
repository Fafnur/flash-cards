import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, tap } from 'rxjs';

import { Card, CardCreate } from '@flashcards/cards/common';
import { isNotNullOrUndefined } from '@flashcards/core';

import { CardApi } from './card.api';
import { CardStorage } from './card.storage';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly state$ = new BehaviorSubject<Card[] | null>(null);

  readonly cards$ = this.state$.asObservable().pipe(isNotNullOrUndefined());

  constructor(
    private readonly cardApi: CardApi,
    private readonly cardStorage: CardStorage,
    private readonly destroyRef: DestroyRef,
  ) {
    this.cardStorage
      .getAll()
      .pipe(
        tap((cards) => this.state$.next(cards)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  init(): void {
    // TODO: Add init
  }

  load(): void {
    // TODO: Add load
  }

  create(cardCreate: CardCreate): void {
    const createdAt = new Date().toISOString();
    const card: Card = {
      ...cardCreate,
      repeated: [],
      createdAt,
      updatedAt: createdAt,
    };
    void this.cardStorage.set(card);
    this.state$.next([...(this.state$.value ?? []), card]);
  }

  sync(): void {}
}
