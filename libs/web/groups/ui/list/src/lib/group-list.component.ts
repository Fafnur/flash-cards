import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { trackByEntity } from '@flashcards/core';
import { Group } from '@flashcards/groups/common';
import { GroupService } from '@flashcards/groups/services';

@Component({
  selector: 'flashcards-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, AsyncPipe],
})
export class GroupListComponent {
  readonly groupService = inject(GroupService);
  readonly trackByEntity = trackByEntity<Group>;
}
