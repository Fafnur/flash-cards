import { inject, Pipe, PipeTransform } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { isNotNullOrUndefined } from '@flashcards/core';
import { Group } from '@flashcards/groups/common';
import { GroupService } from '@flashcards/groups/services';

@Pipe({
  name: 'getGroup',
  standalone: true,
})
export class GetGroupPipe implements PipeTransform {
  readonly groupService = inject(GroupService);

  transform(groupUuid: string | null | undefined): Observable<Group> {
    if (!groupUuid) {
      return EMPTY;
    }

    return this.groupService.group$(groupUuid).pipe(isNotNullOrUndefined());
  }
}
