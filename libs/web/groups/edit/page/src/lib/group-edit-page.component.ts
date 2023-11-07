import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { GetCardsPipe } from '@flashcards/cards/ui/shared';
import { GroupChange } from '@flashcards/groups/common';
import { GroupService } from '@flashcards/groups/services';
import { GetGroupPipe } from '@flashcards/groups/ui/shared';
import { CardsTableComponent } from '@flashcards/web/cards/ui/table';
import { GroupFormComponent } from '@flashcards/web/groups/ui/form';

import { GroupMenuComponent } from './group-menu/group-menu.component';

@Component({
  selector: 'flashcards-group-edit-page',
  templateUrl: './group-edit-page.component.html',
  styleUrls: ['./group-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, GroupFormComponent, AsyncPipe, GetCardsPipe, GetGroupPipe, MatCardModule, CardsTableComponent, GroupMenuComponent],
})
export class GroupEditPageComponent {
  @Input() uuid!: string;

  readonly groupService = inject(GroupService);

  onChanged(group: GroupChange): void {
    this.groupService.change(this.uuid, group);
  }
}
