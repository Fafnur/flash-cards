import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@flashcards/core';
import { Group, GroupChange, GroupCreate } from '@flashcards/groups/common';

@Injectable({
  providedIn: 'root',
})
export class GroupApi {
  constructor(private readonly apiService: ApiService) {}

  load(): Observable<Group[]> {
    return this.apiService.get('/groups');
  }

  create(group: GroupCreate): Observable<Group> {
    return this.apiService.post('/groups', group);
  }

  change(group: GroupChange): Observable<Group> {
    return this.apiService.patch('/groups', group);
  }

  sync(groups: Group[]): Observable<Group> {
    return this.apiService.post('/groups/sync', groups);
  }
}
