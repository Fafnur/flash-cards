import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { tap } from 'rxjs';

import { Card, CardChange } from '@flashcards/cards/common';
import { CardOriginalComponent, CardTranslationComponent } from '@flashcards/web/cards/ui/fields';

@Component({
  selector: 'flashcards-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CardTranslationComponent, CardOriginalComponent],
})
export class CardFormComponent implements OnInit {
  readonly form = new FormGroup({
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  @Input() set card(card: Card | null | undefined) {
    if (card) {
      this.form.patchValue(card);
    }
  }

  @Output() submitted = new EventEmitter<CardChange & { original: string; translation: string }>();
  @Output() changed = new EventEmitter<CardChange>();

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
