import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { isNotNullOrUndefined } from '@flashcards/core';
import { Group, GroupChange } from '@flashcards/groups/common';
import { GroupService } from '@flashcards/groups/services';
import { GroupFormComponent } from '@flashcards/web/groups/ui/form';

@Component({
  selector: 'flashcards-group-edit-page',
  templateUrl: './group-edit-page.component.html',
  styleUrls: ['./group-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GroupFormComponent, AsyncPipe],
})
export class GroupEditPageComponent implements OnInit {
  @Input() uuid!: string;

  readonly groupService = inject(GroupService);

  group$!: Observable<Group>;

  ngOnInit(): void {
    this.group$ = this.groupService.group$(this.uuid).pipe(isNotNullOrUndefined());
  }

  onChanged(group: GroupChange): void {
    this.groupService.change(this.uuid, group);
  }
}
