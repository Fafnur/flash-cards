import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, tap } from 'rxjs';

import { AuthService } from '@flashcards/auth/services';
import { isNotNullOrUndefined } from '@flashcards/core';
import { User } from '@flashcards/users/common';

import { UserStorage } from './user.storage';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly state$ = new BehaviorSubject<User | null>(null);

  readonly user$ = this.state$.asObservable().pipe(isNotNullOrUndefined());

  constructor(
    private readonly authService: AuthService,
    private readonly userApiService: UserApiService,
    private readonly userStorage: UserStorage,
    private readonly destroyRef: DestroyRef,
  ) {
    this.authService.logged$.pipe(tap(() => this.load())).subscribe();
  }

  get uuid(): string {
    return this.authService.uuid;
  }

  init(): void {
    this.userStorage
      .get(this.uuid)
      .pipe(
        tap((user) => {
          if (user) {
            this.state$.next(user);
          } else {
            this.load();
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  load(): void {
    this.userApiService
      .load()
      .pipe(
        tap((user) => {
          this.state$.next(user);
          this.userStorage.set(user);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
