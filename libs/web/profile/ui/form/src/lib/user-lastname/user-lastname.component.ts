import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ExtractTouchedDirective } from '@flashcards/core';

@Component({
  selector: 'flashcards-user-lastname',
  templateUrl: './user-lastname.component.html',
  styleUrl: './user-lastname.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-user-lastname',
  },
  hostDirectives: [
    {
      directive: ExtractTouchedDirective,
      inputs: ['control'],
    },
  ],
})
export class UserLastnameComponent {
  @Input({ required: true }) control!: FormControl<string>;
}
