import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';

import { Group, GroupChange } from '@flashcards/groups/common';
import { GroupLangComponent, GroupNameComponent } from '@flashcards/web/groups/ui/fields';
import { ColumnComponent, RowComponent } from '@flashcards/web/ui/grid';

@Component({
  selector: 'flashcards-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, GroupNameComponent, GroupLangComponent, RowComponent, ColumnComponent],
})
export class GroupFormComponent implements OnInit {
  readonly form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  @Input() set group(group: Group | null | undefined) {
    if (group) {
      this.form.patchValue(group);
    }
  }

  @Output() submitted = new EventEmitter<GroupChange & { name: string }>();
  @Output() changed = new EventEmitter<GroupChange>();

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          this.changed.emit(this.form.getRawValue());
        }),
      )
      .subscribe();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitted.emit(this.form.getRawValue());
    }
  }
}
