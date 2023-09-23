import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@flashcards/core';
import { User } from '@flashcards/users/common';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<User> {
    return this.apiService.get('/users');
  }
}
