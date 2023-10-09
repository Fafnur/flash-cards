import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '@flashcards/auth/services';
import { uuidv4 } from '@flashcards/core';
import { GroupService } from '@flashcards/groups/services';
import { GroupLangComponent, GroupNameComponent } from '@flashcards/web/groups/ui/fields';

@Component({
  selector: 'flashcards-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, GroupNameComponent, GroupLangComponent],
})
export class GroupFormComponent {
  readonly form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authService: AuthService,
    private readonly groupService: GroupService,
    private readonly matDialogRef: MatDialogRef<GroupFormComponent>,
  ) {}

  onCreate(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.changeDetectorRef.markForCheck();
      this.groupService.create({
        ...this.form.getRawValue(),
        user: this.authService.uuid,
        uuid: uuidv4(),
      });
      this.matDialogRef.close();
    }
  }
}
