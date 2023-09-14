import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthResponse } from '@flashcards/auth/common';
import { LocalDBService, LocalStorageSync } from '@flashcards/core';
import { User, USERS_KEY } from '@flashcards/users/common';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {
  constructor(
    private readonly localStorageSync: LocalStorageSync<{ auth: AuthResponse }>,
    private readonly localDBService: LocalDBService<{ users: User }>,
  ) {}

  get(): Observable<User | null> {
    const uuid = this.getUuid();

    if (!uuid) {
      return of(null);
    }

    return this.localDBService.get(USERS_KEY, uuid);
  }

  set(user: User): void {
    void this.localDBService.put(USERS_KEY, user);
  }

  remove(): void {
    const uuid = this.getUuid();

    if (uuid) {
      void this.localDBService.remove(USERS_KEY, uuid);
    }
  }

  private getUuid(): string | undefined {
    return this.localStorageSync.getItem('auth')?.uuid;
  }
}
