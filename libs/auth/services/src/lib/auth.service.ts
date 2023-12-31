import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, retry, tap, throwError, timer } from 'rxjs';

import { AuthConfirm, AuthCredentials, AuthRegister, AuthResponse } from '@flashcards/auth/common';

import { AuthStorage } from './auth.storage';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedAction$ = new ReplaySubject<void>(1);
  private readonly logoutAction$ = new ReplaySubject<void>(1);

  readonly logged$ = this.loggedAction$.asObservable();
  readonly logout$ = this.logoutAction$.asObservable();

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly authStorage: AuthStorage,
  ) {}

  get logged(): boolean {
    return this.authStorage.get() !== null;
  }

  get uuid(): string {
    return this.authStorage.get()?.uuid ?? 'unknown';
  }

  init(): void {
    if (this.logged) {
      this.loggedAction$.next();
    }
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
    this.logoutAction$.next();
    // TODO: navigate to login
  }

  confirm(credentials: AuthConfirm): Observable<AuthResponse> {
    return this.authApiService.confirm(credentials).pipe(
      tap((auth) => {
        this.authStorage.set(auth);
        this.loggedAction$.next();
      }),
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
