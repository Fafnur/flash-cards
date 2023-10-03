import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { GroupNameComponent, GroupLangComponent } from '@flashcards/web/groups/ui/fields';

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
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(1)] }),
    original: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  submitted = false;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  onCreate(): void {
    this.form.markAllAsTouched();

    if (!this.submitted) {
      this.submitted = true;

      this.changeDetectorRef.markForCheck();
    }
  }
}
