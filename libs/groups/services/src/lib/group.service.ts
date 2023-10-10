import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';

import { EntityService, isNotNullOrUndefined } from '@flashcards/core';
import { Group, GroupChange, GroupCreate } from '@flashcards/groups/common';

import { GroupApi } from './group.api';
import { GroupStorage } from './group.storage';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends EntityService<Group> {
  readonly groups$: Observable<Group[]> = this.state$.asObservable().pipe(map((state) => Object.values(state ?? {})));

  readonly group$ = (uuid: string): Observable<Group | undefined> =>
    this.state$.asObservable().pipe(
      isNotNullOrUndefined(),
      map((state) => Object.values(state).find((group) => group.uuid === uuid)),
    );

  constructor(
    private readonly groupApi: GroupApi,
    private readonly groupStorage: GroupStorage,
    private readonly destroyRef: DestroyRef,
  ) {
    super();
  }

  init(userUuid: string): void {
    this.groupStorage
      .getAll()
      .pipe(
        tap((groups) =>
          this.state$.next(
            groups
              .filter((group) => group.user === userUuid)
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

  create(groupCreate: GroupCreate): void {
    const createdAt = new Date().toISOString();
    const group: Group = {
      ...groupCreate,
      createdAt,
      updatedAt: createdAt,
      order: this.entities.length ?? 0,
    };

    this.update(group);
  }

  change(uuid: string, groupChange: GroupChange): void {
    const groupLast = this.state[uuid];

    if (!groupLast) {
      return;
    }

    this.update({ ...groupLast, ...groupChange, updatedAt: new Date().toISOString() });
  }

  sync(): void {}

  private update(group: Group): void {
    void this.groupStorage.set(group);
    this.add(group);
  }
}
