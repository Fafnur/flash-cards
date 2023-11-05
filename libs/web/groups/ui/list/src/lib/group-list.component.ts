import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

import { trackByEntity } from '@flashcards/core';
import { GroupService } from '@flashcards/groups/services';
import { GroupCardComponent } from '@flashcards/web/groups/ui/card';

@Component({
  selector: 'flashcards-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgForOf, AsyncPipe, GroupCardComponent],
})
export class GroupListComponent {
  readonly groupService = inject(GroupService);
  readonly trackByEntity = trackByEntity;

  @Input() action: 'view' | 'edit' | 'learn' = 'view';
}
