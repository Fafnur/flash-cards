import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalDBService } from '@flashcards/core';
import { Group, GROUPS_KEY } from '@flashcards/groups/common';

@Injectable({
  providedIn: 'root',
})
export class GroupStorage {
  constructor(private readonly localDBService: LocalDBService<{ [GROUPS_KEY]: Group }>) {}

  getAll(): Observable<Group[]> {
    return this.localDBService.getAll(GROUPS_KEY);
  }

  set(group: Group): Promise<void> {
    return this.localDBService.put(GROUPS_KEY, group);
  }

  remove(groupOrUUid: Group | string): void {
    const uuid = typeof groupOrUUid === 'string' ? groupOrUUid : groupOrUUid.uuid;
    void this.localDBService.remove(GROUPS_KEY, uuid);
  }
}
