import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ExtractTouchedDirective } from '@flashcards/core';

@Component({
  selector: 'flashcards-user-email',
  templateUrl: './user-email.component.html',
  styleUrl: './user-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-user-email',
  },
  hostDirectives: [
    {
      directive: ExtractTouchedDirective,
      inputs: ['control'],
    },
  ],
})
export class UserEmailComponent {
  @Input({ required: true }) control!: FormControl<string>;
}
