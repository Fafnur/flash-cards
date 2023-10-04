import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { GroupFormComponent } from './group-form/group-form.component';

@Component({
  selector: 'flashcards-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class GroupCreateComponent {
  constructor(private readonly matDialog: MatDialog) {}

  onCreate(): void {
    void this.matDialog.open(GroupFormComponent, { autoFocus: false });
  }
}
