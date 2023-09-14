import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthConfirm, AuthCredentials, AuthRegister, AuthResponse } from '@flashcards/auth/common';
import { ApiService } from '@flashcards/core';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly apiService: ApiService) {}

  login(credentials: AuthCredentials): Observable<void> {
    return this.apiService.post('/auth/login', credentials);
  }

  confirm(credentials: AuthConfirm): Observable<AuthResponse> {
    return this.apiService.post('/auth/confirm', credentials);
  }

  register(register: AuthRegister): Observable<void> {
    return this.apiService.post('/auth/register', register);
  }
}
