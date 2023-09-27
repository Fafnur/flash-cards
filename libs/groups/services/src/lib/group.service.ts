import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, tap } from 'rxjs';

import { isNotNullOrUndefined } from '@flashcards/core';
import { Group, GroupCreate } from '@flashcards/groups/common';

import { GroupApi } from './group.api';
import { GroupStorage } from './group.storage';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly state$ = new BehaviorSubject<Group[] | null>(null);

  readonly groups$ = this.state$.asObservable().pipe(isNotNullOrUndefined());

  constructor(
    private readonly groupApi: GroupApi,
    private readonly groupStorage: GroupStorage,
    private readonly destroyRef: DestroyRef,
  ) {}

  init(): void {
    this.groupStorage
      .getAll()
      .pipe(
        tap((cards) => this.state$.next(cards)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  load(): void {
    // TODO: Add load
  }

  create(groupCreate: GroupCreate): void {
    const createdAt = new Date().toISOString();
    const group: Group = {
      ...groupCreate,
      createdAt,
      updatedAt: createdAt,
      order: this.state$.getValue()?.length ?? 0,
    };
    void this.groupStorage.set(group);
    this.state$.next([...(this.state$.value ?? []), group]);
  }

  sync(): void {}
}
