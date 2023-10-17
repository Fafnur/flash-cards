import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LocalDBService } from '@flashcards/core';
import { User, USERS_KEY } from '@flashcards/users/common';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {
  constructor(private readonly localDBService: LocalDBService<{ users: User }>) {}

  get(uuid: string): Observable<User | null> {
    if (!uuid) {
      return of(null);
    }

    return this.localDBService.get(USERS_KEY, uuid);
  }

  set(user: User): void {
    void this.localDBService.put(USERS_KEY, user);
  }

  remove(uuid: string): void {
    if (uuid) {
      void this.localDBService.remove(USERS_KEY, uuid);
    }
  }
}
