import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthResponse } from '@flashcards/auth/common';
import { LocalStorageAsync } from '@flashcards/core';

@Injectable({
  providedIn: 'root',
})
export class AuthManager {
  readonly key = 'auth';

  constructor(private readonly localStorageAsync: LocalStorageAsync<{ auth: AuthResponse }>) {}

  get(): Observable<AuthResponse | null> {
    return this.localStorageAsync.getItem(this.key);
  }

  put(response: AuthResponse): void {
    this.localStorageAsync.setItem(this.key, response);
  }

  remove(): void {
    this.localStorageAsync.removeItem(this.key);
  }
}
