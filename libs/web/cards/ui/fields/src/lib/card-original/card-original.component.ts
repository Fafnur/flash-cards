import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ExtractTouchedDirective } from '@flashcards/core';

@Component({
  selector: 'flashcards-card-original',
  templateUrl: './card-original.component.html',
  styleUrls: ['./card-original.component.scss'],
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
export class CardOriginalComponent {
  @Input() control!: FormControl<string>;
}
