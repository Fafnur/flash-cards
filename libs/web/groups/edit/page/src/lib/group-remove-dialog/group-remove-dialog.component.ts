import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { GroupService } from '@flashcards/groups/services';
import { GroupFormComponent } from '@flashcards/web/groups/ui/form';

@Component({
  selector: 'flashcards-group-remove-dialog',
  templateUrl: './group-remove-dialog.component.html',
  styleUrls: ['./group-remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GroupFormComponent, MatButtonModule, MatDialogModule],
})
export class GroupRemoveDialogComponent {
  private readonly router = inject(Router);
  private readonly matDialogRef = inject(MatDialogRef<GroupRemoveDialogComponent>);
  private readonly data: { readonly uuid: string } = inject(MAT_DIALOG_DATA);
  private readonly groupService = inject(GroupService);

  onRemove(): void {
    if (this.data.uuid) {
      this.groupService.delete(this.data.uuid);
    }
    void this.router.navigateByUrl('/dictionary');

    this.matDialogRef.close();
  }
}
