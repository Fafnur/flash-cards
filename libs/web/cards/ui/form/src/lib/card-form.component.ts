import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';

import { Card, CardChange, CardNew } from '@flashcards/cards/common';
import { uuidv4 } from '@flashcards/core';
import { CardLearnComponent, CardOriginalComponent, CardTranslationComponent } from '@flashcards/web/cards/ui/fields';

@Component({
  selector: 'flashcards-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatButtonModule, CardTranslationComponent, CardOriginalComponent, CardLearnComponent, MatIconModule],
  animations: [
    trigger('checked', [
      state('on', style({ transform: 'translateX(-10px)' })),
      state('off', style({ transform: 'translateX(0)' })),
      transition('off => on', [
        animate('100ms', keyframes([style({ transform: 'translateX(0)' }), style({ transform: 'translateX(-10px)' })])),
      ]),
      transition('on => off', [
        animate('100ms', keyframes([style({ transform: 'translateX(-10px)' }), style({ transform: 'translateX(0)' })])),
      ]),
    ]),
  ],
})
export class CardFormComponent implements OnInit {
  readonly form = new FormGroup({
    uuid: new FormControl<string>('', { nonNullable: true, validators: [] }),
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    learn: new FormControl<boolean>(false, { nonNullable: true, validators: [] }),
    repeated: new FormControl<string[]>([], { nonNullable: true, validators: [] }),
  });

  @ViewChild(CardTranslationComponent, { static: true }) translation!: CardTranslationComponent;

  @Input() set card(card: Card | null | undefined) {
    if (card) {
      this.currentCard = card;
      this.form.patchValue({ ...card, learn: card.repeated.length > 0 });
    }
  }

  @Output() submitted = new EventEmitter<CardNew>();
  @Output() changed = new EventEmitter<CardChange>();
  @Output() removed = new EventEmitter<string>();

  removing = false;

  currentCard?: Card;

  get hasCard(): boolean {
    return !!this.form.controls.uuid.value;
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          if (this.hasCard) {
            const { learn, repeated, ...formData } = this.form.getRawValue();
            const repeatedChanged =
              !learn && repeated.length > 0 ? [] : learn && repeated.length === 0 ? [new Date().toISOString()] : repeated;

            this.changed.emit({ ...formData, repeated: repeatedChanged } as CardChange);
          } else if (this.form.valid) {
            const uuid = uuidv4();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { learn, repeated, ...formData } = this.form.getRawValue();

            this.submitted.emit({ ...formData, uuid });
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

  onRemoving(): void {
    this.removing = true;
  }

  onBack(): void {
    this.removing = false;
  }

  onFocus(): void {
    this.translation.focus();
  }
}
