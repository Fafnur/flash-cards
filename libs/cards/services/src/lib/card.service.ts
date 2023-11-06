import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

import { Card, CardChange, CardCreate } from '@flashcards/cards/common';
import { EntityService, isNotNullOrUndefined, sortComparer } from '@flashcards/core';

import { CardApi } from './card.api';
import { CardStorage } from './card.storage';

@Injectable({
  providedIn: 'root',
})
export class CardService extends EntityService<Card> {
  readonly cards$ = this.state$.asObservable().pipe(map((state) => Object.values(state ?? {})));

  readonly cardsByGroup$ = (groupUuid: string) =>
    this.state$.asObservable().pipe(
      isNotNullOrUndefined(),
      map((cards) =>
        Object.values(cards)
          .filter((card) => card.groupUuid === groupUuid)
          .sort(sortComparer),
      ),
    );

  constructor(
    private readonly cardApi: CardApi,
    private readonly cardStorage: CardStorage,
    private readonly destroyRef: DestroyRef,
  ) {
    super();
  }

  init(userUuid: string): void {
    this.cardStorage
      .getAll()
      .pipe(
        tap((cards) =>
          this.state$.next(
            cards
              .filter((card) => card.user === userUuid)
              .reduce(
                (acc, current) => ({
                  ...acc,
                  [current.uuid]: current,
                }),
                {},
              ),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  load(): void {
    // TODO: Add load
  }

  create(cardCreate: CardCreate): void {
    const createdAt = new Date().toISOString();
    const card: Card = {
      ...cardCreate,
      learned: false,
      createdAt,
      updatedAt: createdAt,
    };

    this.update(card);
  }

  change(uuid: string, cardChange: CardChange): void {
    const cardLast = this.state[uuid];

    if (!cardLast) {
      return;
    }

    this.update({ ...cardLast, ...cardChange, updatedAt: new Date().toISOString() });
  }

  remove(uuid: string): void {
    const cardLast = this.state[uuid];

    if (!cardLast) {
      return;
    }

    void this.cardStorage.remove(uuid);
    this.delete(uuid);
  }

  sync(): void {}

  private update(card: Card): void {
    void this.cardStorage.set(card);
    this.add(card);
  }
}
