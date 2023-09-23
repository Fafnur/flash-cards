import { Injectable } from '@angular/core';

import { AUTH_KEY, AuthResponse } from '@flashcards/auth/common';
import { LocalStorageSync } from '@flashcards/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {
  constructor(private readonly localStorageSync: LocalStorageSync<{ auth: AuthResponse }>) {}

  get(): AuthResponse | null {
    return this.localStorageSync.getItem(AUTH_KEY);
  }

  set(response: AuthResponse): void {
    this.localStorageSync.setItem(AUTH_KEY, response);
  }

  remove(): void {
    this.localStorageSync.removeItem(AUTH_KEY);
  }
}
