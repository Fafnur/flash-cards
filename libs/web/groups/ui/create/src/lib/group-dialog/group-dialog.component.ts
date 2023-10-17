import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@flashcards/auth/services';
import { uuidv4 } from '@flashcards/core';
import { GroupChange } from '@flashcards/groups/common';
import { GroupService } from '@flashcards/groups/services';
import { GroupFormComponent } from '@flashcards/web/groups/ui/form';

@Component({
  selector: 'flashcards-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, GroupFormComponent],
})
export class GroupDialogComponent {
  @ViewChild(GroupFormComponent) groupFormComponent!: GroupFormComponent;

  constructor(
    private readonly authService: AuthService,
    private readonly groupService: GroupService,
    private readonly matDialogRef: MatDialogRef<GroupDialogComponent>,
  ) {}

  onSubmit() {
    this.groupFormComponent.onSubmit();
  }

  onSubmitted(form: GroupChange & { name: string }): void {
    this.groupService.create({
      ...form,
      user: this.authService.uuid,
      uuid: uuidv4(),
    });
    this.matDialogRef.close();
  }
}
