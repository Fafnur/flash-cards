import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ExtractTouchedDirective } from '@flashcards/core';

@Component({
  selector: 'flashcards-group-name',
  templateUrl: './group-name.component.html',
  styleUrls: ['./group-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, ExtractTouchedDirective],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flashcards-group-name',
  },
  hostDirectives: [
    {
      directive: ExtractTouchedDirective,
      inputs: ['control'],
    },
  ],
})
export class GroupNameComponent {
  @Input() control!: FormControl<string>;
}
