import { Injectable } from '@angular/core';
import { Observable, retry, tap, throwError, timer } from 'rxjs';

import { AuthConfirm, AuthCredentials, AuthRegister, AuthResponse } from '@flashcards/auth/common';
import { AuthApiService, AuthStorageService } from '@flashcards/auth/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly authStorageService: AuthStorageService,
  ) {}

  login(credentials: AuthCredentials): Observable<void> {
    return this.authApiService.login(credentials).pipe(
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

  logout(): void {
    this.authStorageService.remove();
  }

  confirm(credentials: AuthConfirm): Observable<AuthResponse> {
    return this.authApiService.confirm(credentials).pipe(
      tap((auth) => this.authStorageService.set(auth)),
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
