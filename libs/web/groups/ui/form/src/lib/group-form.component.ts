import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { GroupChange } from '@flashcards/groups/common';
import { GroupLangComponent, GroupNameComponent } from '@flashcards/web/groups/ui/fields';

@Component({
  selector: 'flashcards-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, GroupNameComponent, GroupLangComponent],
})
export class GroupFormComponent {
  readonly form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  @Output() submitted = new EventEmitter<GroupChange & { name: string }>();

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitted.emit(this.form.getRawValue());
    }
  }
}
