import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';

import { Card, CardChange, CardNew } from '@flashcards/cards/common';
import { uuidv4 } from '@flashcards/core';
import { CardOriginalComponent, CardTranslationComponent } from '@flashcards/web/cards/ui/fields';

@Component({
  selector: 'flashcards-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatButtonModule, CardTranslationComponent, CardOriginalComponent, MatIconModule],
})
export class CardFormComponent implements OnInit {
  readonly form = new FormGroup({
    uuid: new FormControl<string>('', { nonNullable: true, validators: [] }),
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  @ViewChild(CardTranslationComponent, { static: true }) translation!: CardTranslationComponent;

  @Input() set card(card: Card | null | undefined) {
    if (card) {
      this.form.patchValue(card);
    }
  }

  @Output() submitted = new EventEmitter<CardNew>();
  @Output() changed = new EventEmitter<CardChange>();
  @Output() removed = new EventEmitter<string>();

  get hasCard(): boolean {
    return !!this.form.controls.uuid.value;
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          if (this.hasCard) {
            this.changed.emit(this.form.getRawValue() as CardChange);
          } else if (this.form.valid) {
            const uuid = uuidv4();
            this.submitted.emit({ ...this.form.getRawValue(), uuid });
            this.translation.blur();
            this.form.reset();
          }
        }),
      )
      .subscribe();
  }

  onRemove(): void {
    this.removed.emit(this.form.controls.uuid.value as string);
  }

  onFocus(): void {
    this.translation.focus();
  }
}
