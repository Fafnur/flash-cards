import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { GroupRemoveDialogComponent } from '../group-remove-dialog/group-remove-dialog.component';

@Component({
  selector: 'flashcards-group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule],
})
export class GroupMenuComponent {
  @Input({ required: true }) uuid!: string;

  private readonly matDialog = inject(MatDialog);

  onRemove(): void {
    this.matDialog.open(GroupRemoveDialogComponent, { data: { uuid: this.uuid } });
  }
}
