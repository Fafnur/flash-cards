import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ExtractTouchedDirective } from '@flashcards/core';

@Component({
  selector: 'flashcards-card-translation',
  templateUrl: './card-translation.component.html',
  styleUrls: ['./card-translation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, ExtractTouchedDirective],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-card-original',
  },
  hostDirectives: [
    {
      directive: ExtractTouchedDirective,
      inputs: ['control'],
    },
  ],
})
export class CardTranslationComponent {
  @Input() control!: FormControl<string>;
  @ViewChild('input', { static: true }) inputElementRef!: ElementRef<HTMLInputElement>;

  focus(): void {
    this.inputElementRef.nativeElement.focus();
  }

  blur(): void {
    this.inputElementRef.nativeElement.blur();
  }
}
