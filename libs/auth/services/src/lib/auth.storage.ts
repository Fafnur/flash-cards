import { Injectable } from '@angular/core';

import { AuthResponse } from '@flashcards/auth/common';
import { LocalStorageSync } from '@flashcards/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {
  readonly key = 'auth';

  constructor(private readonly localStorageSync: LocalStorageSync<{ auth: AuthResponse }>) {}

  get(): AuthResponse | null {
    return this.localStorageSync.getItem(this.key);
  }

  set(response: AuthResponse): void {
    this.localStorageSync.setItem(this.key, response);
  }

  remove(): void {
    this.localStorageSync.removeItem(this.key);
  }
}
