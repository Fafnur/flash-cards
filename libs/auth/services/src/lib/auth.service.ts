import { Injectable } from '@angular/core';
import { Observable, retry, tap, throwError, timer } from 'rxjs';

import { AuthConfirm, AuthCredentials, AuthRegister, AuthResponse } from '@flashcards/auth/common';

import { AuthApiService } from './auth-api.service';
import { AuthStorage } from './auth.storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly authStorage: AuthStorage,
  ) {}

  get logged(): boolean {
    return this.authStorage.get() !== null;
  }

  login(credentials: AuthCredentials): Observable<void> {
    return this.authApiService.login(credentials).pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => {
          if ([400, 404, 500].includes(error.status)) {
            return throwError(() => error);
          }

          return timer(retryCount * 1000);
        },
      }),
    );
  }

  logout(): void {
    this.authStorage.remove();
  }

  confirm(credentials: AuthConfirm): Observable<AuthResponse> {
    return this.authApiService.confirm(credentials).pipe(
      tap((auth) => this.authStorage.set(auth)),
      retry({
        count: 3,
        delay: (error, retryCount) => {
          if ([400, 500].includes(error.status)) {
            return throwError(() => error);
          }

          return timer(retryCount * 1000);
        },
      }),
    );
  }

  register(register: AuthRegister): Observable<void> {
    return this.authApiService.register(register).pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => {
          if ([400, 500].includes(error.status)) {
            return throwError(() => error);
          }

          return timer(retryCount * 1000);
        },
      }),
    );
  }
}
